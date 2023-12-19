import db from '../db/connect';

interface EventArgs {
  id: string;
}

interface CreateEventArgs {
  event_name: string;
  event_type: string;
}

interface UpdateEventArgs extends Partial<CreateEventArgs> {
  id: string;
}

export const EventResolver = {
  Query: {
    event: async (_: void, { id }: EventArgs) => {
      const [event] = await db('events').where('id', id).select('*');
      return event;
    },
    events: async () => {
      const events = await db('events').select('*');
      return events;
    },
  },
  Mutation: {
    createEvent: async (_: void, { event_name, event_type }: CreateEventArgs) => {
      const [newEvent] = await db('events')
        .insert({ event_name, event_type })
        .returning('*');
      return newEvent;
    },
    updateEvent: async (_: void, { id, event_name, event_type }: UpdateEventArgs) => {
      const [updatedEvent] = await db('events')
        .where('id', id)
        .update({ event_name, event_type })
        .returning('*');
      return updatedEvent;
    },
  },
};
