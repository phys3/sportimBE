import db from '../db/connect';

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
    attendees: async () => {
      const attendees = await db('attendees').select('*');
      return attendees;
    },
    eventAttendees: async ({ id }: AttendeeArgs) => {
      const attendees = await db('attendees').where('event_id', id).select('*');
      return attendees;
    },
  },
  Mutation: {
    createAttendee: async ({
      user_id,
      event_id,
      rsvp_status,
    }: CreateAttendeeArgs) => {
      const [newAttendee] = await db('attendees')
        .insert({ event_id, user_id, rsvp_status })
        .returning('*');
      return newAttendee;
    },
    deleteAttendee: async ({ id }: DeleteAttendeeArgs) => {
      const deletedRows = await db('attendees').where('id', id).del();
      return deletedRows > 0;
    },
  },
};
