export const EventQuery = `
    event(id: ID!): Event
    events: [Event]
    getEventsByProximity(latitude: Float!, longitude: Float!): [Event]
`
