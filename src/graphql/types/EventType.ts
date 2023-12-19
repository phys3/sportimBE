export const EventType = `
    type Point {
        lat: Float!
        lng: Float!
    }
    type Event {
        id: ID!
        event_type: Int!
        age_group: String
        skill_level: Int
        event_location: Point!
        date_time: String!
        host_user_uid: ID!
        date_created: String!
        date_updated: String!
    }
`;
