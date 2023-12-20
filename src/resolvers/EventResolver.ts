import db from '../db/connect';

interface EventArgs {
  id: string;
}
interface CreateEventArgs {
    event_type: number;
    age_group: string;
    skill_level: number;
    event_location: { lat: number, lng: number };
    date_time: string;
    host_user_uid: string;
  }
  
  interface UpdateEventArgs extends Partial<CreateEventArgs> {
    id: string;
  }

export const EventResolver = {
  Query: {
    event: async ({ id }: EventArgs) => {
      const [event] = await db('events').where('id', id).select('*');
      return event;
    },
    events: async () => {
      const events = await db('events').select('*', db.raw('ST_Y(event_location::geometry) as latitude, ST_X(event_location::geometry) as longitude'));
      return events.map(event => ({
        ...event,
        event_location: {
          lat: event.latitude,
          lng: event.longitude
        }
      }));
    },
  },
  Mutation: {
    createEvent: async (args: CreateEventArgs) => {
        const { event_location, ...rest } = args;
        const [newEvent] = await db('events')
          .insert({
            ...rest,
            event_location: db.raw('ST_SetSRID(ST_MakePoint(?, ?), 4326)', [event_location.lng, event_location.lat])
          })
          .returning('*');
        return newEvent;
      },
      updateEvent: async ({ id, event_location, ...rest }: UpdateEventArgs) => {
        const [updatedEvent] = await db('events')
          .where('id', id)
          .update({ ...rest,
            event_location: event_location
              ? db.raw('ST_SetSRID(ST_MakePoint(?, ?), 4326)', [event_location.lng, event_location.lat])
              : undefined})
          .returning('*');
        return updatedEvent;
      },
  },
};
