import db from '../db/connect.js'

interface EventArgs {
  id: string;
}
interface CreateEventArgs {
  event_type: number;
  age_group: string;
  skill_level: number;
  event_location: { latitude: number; longitude: number };
  date_time: string;
  host_user_uid: string;
}

interface UpdateEventArgs extends Partial<CreateEventArgs> {
  id: string;
}
interface ProximityArgs {
	latitude: number;
	longitude: number;
  }
export const EventResolver = {
	Query: {
		event: async (_parent: unknown, { id }: EventArgs) => {
			const [event] = await db('events').where('id', id).select('*')
			return event
		},
		events: async () => {
			const events = await db('events').select(
				'*',
				db.raw(
					'ST_Y(event_location::geometry) as latitude, ST_X(event_location::geometry) as longitude',
				),
			)
			return events.map(event => ({
				...event,
				event_location: {
					latitude: event.latitude,
					longitude: event.longitude,
				},
			}))
		},
		getEventsByProximity: async (_parent: unknown, { latitude, longitude }: ProximityArgs) => {
			const events = await db('events')
				.select(
					'*',
					db.raw(
						'ST_Y(event_location::geometry) as latitude, ST_X(event_location::geometry) as longitude',
					),
					db.raw(
						'ST_Distance(event_location, ST_SetSRID(ST_MakePoint(?, ?), 4326)) as distance',
						[longitude, latitude],
					),
				)
				.orderBy('distance', 'asc')
				.limit(10)
		
			return events.map(event => ({
				...event,
				event_location: {
					latitude: event.latitude,
					longitude: event.longitude,
				},
			}))
		},
	},
	Mutation: {
		createEvent: async (_parent: unknown, args: CreateEventArgs) => {
			try {
				const { event_location, ...rest } = args
				const [newEvent] = await db('events')
					.insert({
						...rest,
						event_location: db.raw('ST_SetSRID(ST_MakePoint(?, ?), 4326)', [
							event_location.longitude,
							event_location.latitude,
						]),
					})
					.returning([
						'*',
						db.raw(
							'ST_Y(event_location::geometry) as latitude, ST_X(event_location::geometry) as longitude',
						),
					])

				return {
					...newEvent,
					event_location: {
						latitude: newEvent.latitude,
						longitude: newEvent.longitude,
					},
				}
			} catch (e) {
				console.log('Error creating event', e)
				return JSON.stringify(e)
			}
		},
		updateEvent: async (
			_parent: unknown,
			{ id, event_location, ...rest }: UpdateEventArgs,
		) => {
			const [updatedEvent] = await db('events')
				.where('id', id)
				.update({
					...rest,
					event_location: event_location
						? db.raw('ST_SetSRID(ST_MakePoint(?, ?), 4326)', [
							event_location.longitude,
							event_location.latitude,
						])
						: undefined,
				})
				.returning([
					'*',
					db.raw(
						'ST_Y(event_location::geometry) as latitude, ST_X(event_location::geometry) as longitude',
					),
				])
			return {
				...updatedEvent,
				event_location: {
					latitude: updatedEvent.latitude,
					longitude: updatedEvent.longitude,
				},
			}
		},
	},
}
