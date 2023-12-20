import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
dotenv.config();
import { UserResolver } from './src/resolvers/UserResolver.js';
import { EventResolver } from './src/resolvers/EventResolver.js';
import { AttendeeResolver } from './src/resolvers/AttendeeResolver.js';
import schema from './src/graphql/index.js';

const root = {
  ...UserResolver.Query,
  ...EventResolver.Query,
  ...AttendeeResolver.Query,
  ...UserResolver.Mutation,
  ...EventResolver.Mutation,
  ...AttendeeResolver.Mutation,
};
const server = new ApolloServer({
  typeDefs: schema,
  resolvers: root,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`Server ready at: ${url}`);
