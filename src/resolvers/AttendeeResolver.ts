import db from '../db/connect.js'

interface AttendeeArgs {
  id: string;
}

interface CreateAttendeeArgs {
  user_id: string;
  event_id: string;
  rsvp_status: string;
}

interface DeleteAttendeeArgs {
  id: string;
}

export const AttendeeResolver = {
	Query: {
		eventAttendees: async (_parent: unknown, { id }: AttendeeArgs) => {
			console.log('id', id)
			const attendees = await db('attendees')
				.join('users', 'users.id', 'attendees.user_id')
				.where('attendees.event_id', id)
				.select('users.*')
			return attendees
		},
	},
	Mutation: {
		createAttendee: async (
			_parent: unknown,
			{ user_id, event_id, rsvp_status }: CreateAttendeeArgs,
		) => {
			const [newAttendee] = await db('attendees')
				.insert({ event_id, user_id, rsvp_status })
				.returning('*')
			return newAttendee
		},
		deleteAttendee: async (_parent: unknown, { id }: DeleteAttendeeArgs) => {
			const deletedRows = await db('attendees').where('id', id).del()
			return deletedRows > 0
		},
	},
}
