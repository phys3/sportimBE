export const AttendeeMutation = `
    createAttendee(user_id: ID!, event_id: ID!, rsvp_status: Int!): Attendee!
    deleteAttendee(attendid: ID!): Boolean!
`;
