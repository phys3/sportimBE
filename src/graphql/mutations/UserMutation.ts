export const UserMutation = `
    createUser(id: String!, username: String!, email: String!): User!
    updateUser(id: ID!, username: String, email: String): User!
`;
