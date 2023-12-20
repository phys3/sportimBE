import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { graphqlHTTP } from 'express-graphql';
import { UserResolver } from './src/resolvers/UserResolver';
import { EventResolver } from './src/resolvers/EventResolver';
import { AttendeeResolver } from './src/resolvers/AttendeeResolver';
import schema from './src/graphql';

const root = {
  ...UserResolver.Query,
  ...EventResolver.Query,
  ...AttendeeResolver.Query,
  ...UserResolver.Mutation,
  ...EventResolver.Mutation,
  ...AttendeeResolver.Mutation,
};

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(process.env.PORT);
console.log(
  `Running a GraphQL API server at http://localhost:${process.env.PORT}/graphql`,
);
