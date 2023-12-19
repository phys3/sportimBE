export const EventMutation = `
    createEvent(event_name: String!, event_type: String!): Event!
    updateEvent(id: ID!, event_name: String, event_type: String): Event!
`;
