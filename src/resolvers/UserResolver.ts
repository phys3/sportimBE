import db from '../db/connect.js';

interface UserArgs {
  id: string;
}

interface CreateUserArgs {
  username: string;
  email: string;
}
interface UpdateUserArgs extends Partial<CreateUserArgs> {
  id: string;
}

export const UserResolver = {
  Query: {
    user: async (_parent: any, { id }: UserArgs) => {
      const [user] = await db('users').where('id', id).select('*');
      return user;
    },
    users: async () => {
      const users = await db('users').select('*');
      return users;
    },
  },
  Mutation: {
    createUser: async (_parent: any, { username, email }: CreateUserArgs) => {
      const [newUser] = await db('users')
        .insert({ username, email })
        .returning('*');
      return newUser;
    },
    updateUser: async (
      _parent: any,
      { id, username, email }: UpdateUserArgs,
    ) => {
      const [updatedUser] = await db('users')
        .where('id', id)
        .update({ username, email })
        .returning('*');
      return updatedUser;
    },
  },
};
