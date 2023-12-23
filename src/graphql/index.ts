import { buildSchema } from 'graphql'
import { UserType, EventType, AttendeeType } from './types/index.js'
import { UserQuery, EventQuery, AttendeeQuery } from './queries/index.js'
import {
	UserMutation,
	EventMutation,
	AttendeeMutation,
} from './mutations/index.js'

export default buildSchema(`
    ${UserType}
    ${EventType}
    ${AttendeeType}
    
    type Query {
        ${UserQuery}
        ${EventQuery}
        ${AttendeeQuery}
    }
    
    type Mutation {
        ${UserMutation}
        ${EventMutation}
        ${AttendeeMutation}
    }
`)
