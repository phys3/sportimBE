# Courtz Backend

This is a personal project aimed at learning and exploring various technologies in the realm of backend development. The project is a backend service for an event management system, where users can create, update, and view events.

## Technologies Used

- **Node.js**
- **TypeScript**
- **Apollo Server**
- **GraphQL**
- **Knex.js**
- **PostgreSQL**

## Project Structure

The project is structured in a way that separates concerns and makes it easy to navigate and understand. Here's a brief overview of the main directories and files:

- `src/`: This is where the main application code resides.
  - `db/`: Contains the database connection setup.
  - `graphql/`: Contains GraphQL related code, divided into mutations, queries, and types.
  - `resolvers/`: Contains the resolvers for the GraphQL queries and mutations.
- `sql/`: Contains SQL scripts for creating the database schema and populating it with some initial data.
- `index.ts`: The entry point of the application.
- `package.json`: Lists the project dependencies and scripts.
- `tsconfig.json`: Configuration for the TypeScript compiler.

## Getting Started

To run the project, you need to have Node.js and npm installed. After cloning the repository, install the dependencies by running `npm install`. You can then start the server by running `npm start`.

Please note that you'll need to have a PostgreSQL database set up and the connection details should be provided in a `.env` file at the root of the project. The `.env` file should contain the following variables: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `DB_PORT`.

## Disclaimer

This project is for learning purposes and is not intended for production use. It's a great way to get familiar with the technologies used and understand how they can work together to create a functional backend service.
