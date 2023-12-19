import { buildSchema } from "graphql";
import { UserType, EventType, AttendeeType } from "./types";
import { UserQuery, EventQuery, AttendeeQuery } from "./queries";
import { UserMutation, EventMutation, AttendeeMutation } from "./mutations";

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
`);