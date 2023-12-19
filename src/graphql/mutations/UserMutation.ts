export const UserMutation = `
    createUser(username: String!, email: String!): User!
    updateUser(id: ID!, username: String, email: String): User!
`;
