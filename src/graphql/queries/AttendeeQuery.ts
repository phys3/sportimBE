export const AttendeeQuery = `
    attendees: [Attendee]
    eventAttendees(id: ID!): [User]
`;
