import { access } from 'fs';
import db from '../db/connect.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI,
);
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
    exchangeToken: async (_parent: any, { code }: { code: string }) => {
      try {
      const {tokens} = await client.getToken(code)
      const idToken = tokens.id_token;
      if (!idToken) {
        throw new Error('Unable to get an ID token');
      }
  
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.OAUTH_CLIENT_ID,
      });
      const { sub: googleId, email } = ticket.getPayload();
      let [user] = await db('users').where('google_id', googleId);
      let firstTimeLogin = false;
      if (!user) {
        firstTimeLogin = true;
        [user] = await db('users').insert({ username: email.split('@')[0], google_id: googleId, email }).returning('*');
      }
  
      return {
        accessToken: tokens.access_token,
        user,
        firstTimeLogin,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Unable to exchange token');
    }
  },
},
}