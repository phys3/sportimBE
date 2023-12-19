const { buildSchema } = require("graphql")

module.exports = buildSchema(`
    type User {
        id: ID!
        username: String!
        email: String!
        date_created: String!
        date_updated: String!
    }
    
    type Event {
        id: ID!
        event_name: String!
        event_type: String!
        date_created: String!
        date_updated: String!
    }
    
    type Attendee {
        id: ID!
        user: User!
        event: Event!
        date_created: String!
        date_updated: String!
    }
    
    type Query {
        user(id: ID!): User
        users: [User]
        event(id: ID!): Event
        events: [Event]
        attendees: [Attendee]
        eventAttendees(id: ID!): [User]
    }
    
    type Mutation {
        createUser(id: String!, username: String!, email: String!): User!
        createEvent(event_name: String!, event_type: String!): Event!
        createAttendee(id: ID!, id: ID!): Attendee!
        deleteAttendee(attendid: ID!): Boolean!
        updateUser(id: ID!, username: String, email: String): User!
        updateEvent(id: ID!, event_name: String, event_type: String): Event!

    }
`)