import db from '../db/connect';

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
    user: async ({ id }: UserArgs) => {
      const [user] = await db('users').where('id', id).select('*');
      return user;
    },
    users: async () => {
      const users = await db('users').select('*');
      return users;
    },
  },
  Mutation: {
    createUser: async ({ username, email }: CreateUserArgs) => {
      const [newUser] = await db('users')
        .insert({ username, email })
        .returning('*');
      return newUser;
    },
    updateUser: async ({ id, username, email }: UpdateUserArgs) => {
      const [updatedUser] = await db('users')
        .where('id', id)
        .update({ username, email })
        .returning('*');
      return updatedUser;
    },
  },
};
