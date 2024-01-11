import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import dotenv from 'dotenv'
dotenv.config()
import { UserResolver } from './src/resolvers/UserResolver.js'
import { EventResolver } from './src/resolvers/EventResolver.js'
import { AttendeeResolver } from './src/resolvers/AttendeeResolver.js'
import schema from './src/graphql/index.js'

const root = {
	Query: {
		...UserResolver.Query,
		...EventResolver.Query,
		...AttendeeResolver.Query,
	},
	Mutation: {
		...UserResolver.Mutation,
		...EventResolver.Mutation,
		...AttendeeResolver.Mutation,
	},
}
const server = new ApolloServer({
	typeDefs: schema,
	resolvers: root,
	status400ForVariableCoercionErrors: true,
})

const { url } = await startStandaloneServer(server, {
	listen: { port: Number(process.env.PORT) },
})

console.log(`Server ready at: ${url}`)
