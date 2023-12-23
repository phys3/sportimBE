export const UserType = `
    type User {
        id: ID!
        username: String!
        email: String!
        google_id: String
        date_created: String!
        date_updated: String!
    }
    type AuthPayload {
        accessToken: String!
        user: User!
      }
`;
