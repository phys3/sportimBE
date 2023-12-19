const express = require('express');
import dotenv from 'dotenv';
dotenv.config();
const { graphqlHTTP } = require("express-graphql")
const schema = require("./src/graphql/schemas.ts")
const db = require('./src/db/connect.js');

const root = {
    user: ({ user_uid }) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE user_uid=($1)', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    },
    users: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    },
    event: ({ event_uid }) => {
        return new Promise((resolve, reject) => {
            const values = [event_uid];
            const text = 'SELECT * FROM events WHERE event_uid=($1)';
            db.query(text, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    },
    events: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM events', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    },
    attendees: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM attendees', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    },
    eventAttendees: ({ event_uid }) => {
        return new Promise((resolve, reject) => {
          const values = [event_uid];
          const text = `
            SELECT users.* 
            FROM users 
            JOIN attendees ON users.user_uid = attendees.user_uid 
            WHERE attendees.event_uid = $1
          `;
          db.query(text, values, (err, result) => {
            if (err) {
                console.log(err);
              reject(err);
            } else {
                console.log(result.rows);
              resolve(result.rows);
            }
          });
        });
      },
    createUser: ({ user_uid, username, email }) => {
        return new Promise((resolve, reject) => {
            const values = [user_uid, username, email];
            const text = 'INSERT INTO users VALUES ($1,$2,$3)';
            db.query(text, values)
            .then(result => {
                console.log(result);
                resolve(result.rows[0])
            })
            .catch(err => reject(err));
        });
    },
    createEvent: ({ event_uid, event_type, age_group, skill_level, event_location, date_time, host_user_uid }) => {
        return new Promise((resolve, reject) => {
            const values = [event_uid, event_type, age_group, skill_level, event_location, date_time, host_user_uid];
            const text = 'INSERT INTO events VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())';
            db.query(text, values)
            .then(result => resolve(result.rows[0]))
            .catch(err => reject(err));
        });
    },
    updateUser: ({ user_uid, username, email }) => {
        const setClauses = [];
        const values = [];

        if (username) {
            setClauses.push(`username = $${values.length + 1}`);
            values.push(username);
        }
        if (email) {
            setClauses.push(`email = $${values.length + 1}`);
            values.push(email);
        }

        const text = `UPDATE users SET ${setClauses.join(', ')} WHERE user_uid = $${values.length + 1} RETURNING *`;
        values.push(user_uid);

        return db.query(text, values)
            .then(result => result.rows[0])
            .catch(err => Promise.reject(err));
    },
    updateEvent: ({ event_uid, event_name, event_type }) => {
        const setClauses = [];
        const values = [];

        if (event_name) {
            setClauses.push(`event_name = $${values.length + 1}`);
            values.push(event_name);
        }
        if (event_type) {
            setClauses.push(`event_type = $${values.length + 1}`);
            values.push(event_type);
        }

        const text = `UPDATE events SET ${setClauses.join(', ')} WHERE event_uid = $${values.length + 1} RETURNING *`;
        values.push(event_uid);

        return db.query(text, values)
            .then(result => result.rows[0])
            .catch(err => Promise.reject(err));
    },
    createAttendee: ({ user_uid, event_uid, rsvp_status, comments }) => {
        return new Promise((resolve, reject) => {
            const values = [event_uid, user_uid, rsvp_status, comments];
            const text = 'INSERT INTO attendees (event_uid, user_uid, rsvp_status, comments) VALUES ($1, $2, $3, $4)';
            db.query(text, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Successfully attended event');
                }
            });
        });
    },
    deleteAttendee: ({ attendance_uid }) => {
        return new Promise((resolve, reject) => {
            const values = [attendance_uid];
            const text = 'DELETE FROM attendees WHERE attendance_uid = ($1)';
            db.query(text, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Successfully canceled attendance');
                }
            });
        });
    },
};

const app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(3000)
console.log("Running a GraphQL API server at http://localhost:3000/graphql")