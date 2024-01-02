export const EventType = `
    input EventLocationInput {
        latitude: Float!
        longitude: Float!
    }
    type EventLocationOutput {
        latitude: Float!
        longitude: Float!
    }
    type Event {
        id: ID!
        event_type: Int!
        age_group: String
        skill_level: Int
        event_location: EventLocationOutput!
        date_time: String!
        host_user_uid: ID!
        date_created: String!
        date_updated: String!
    }
`
