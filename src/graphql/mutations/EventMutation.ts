export const EventMutation = `
    createEvent(event_type: Int!, age_group: String, skill_level: Int, event_location: Point!, date_time: String!, host_user_uid: ID!): Event!
    updateEvent(id: ID!, event_type: Int, age_group: String, skill_level: Int, event_location: Point, date_time: String, host_user_uid: ID!): Event!
`;