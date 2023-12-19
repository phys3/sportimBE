-- Insert dummy data into the 'users' table
INSERT INTO users (username, email)
VALUES 
  ('Marino', 'marin@gmail.com'),
  ('Dario', 'da@gmail.com'),
  ('Lovro', 'lov@gmail.com'),
  ('Jelena', 'jel@gmail.com'),
  ('User1', 'user1@gmail.com'),
  ('User2', 'user2@gmail.com'),
  ('User3', 'user3@gmail.com'),
  ('User4', 'user4@gmail.com');

-- Insert dummy data into the 'event_types' table
INSERT INTO event_types (type_name)
VALUES 
  ('Conference'),
  ('Seminar'),
  ('Workshop'),
  ('Webinar'),
  ('Meetup'),
  ('Hackathon');

-- Assume that we know the UUIDs of the users and event_types
-- Insert dummy data into the 'events' table
INSERT INTO events (event_type, age_group, skill_level, event_location, date_time, host_user_uid)
VALUES 
  (1, '10-12', 1, '(0, 0)', '2023-01-01 10:00:00', (SELECT id FROM users WHERE username = 'Marino')),
  (1, '10-12', 1, '(1, 1)', '2023-02-15 14:30:00', (SELECT id FROM users WHERE username = 'Dario')),
  (2, '10-12', 1, '(2, 2)', '2023-03-20 09:00:00', (SELECT id FROM users WHERE username = 'Lovro')),
  (3, '13-15', 2, '(3, 3)', '2023-04-25 11:00:00', (SELECT id FROM users WHERE username = 'Jelena')),
  (4, '16-18', 3, '(4, 4)', '2023-05-30 12:00:00', (SELECT id FROM users WHERE username = 'User1')),
  (5, '19-21', 4, '(5, 5)', '2023-06-05 13:00:00', (SELECT id FROM users WHERE username = 'User2'));

-- Assume that we know the UUIDs of the events and users
-- Insert dummy data into the 'attendees' table
INSERT INTO attendees (event_id, user_id, rsvp_status)
VALUES 
  ((SELECT id FROM events WHERE date_time = '2023-01-01 10:00:00'), (SELECT id FROM users WHERE username = 'Marino'), 1),
  ((SELECT id FROM events WHERE date_time = '2023-01-01 10:00:00'), (SELECT id FROM users WHERE username = 'Dario'), 0),
  ((SELECT id FROM events WHERE date_time = '2023-02-15 14:30:00'), (SELECT id FROM users WHERE username = 'Lovro'), 1),
  ((SELECT id FROM events WHERE date_time = '2023-03-20 09:00:00'), (SELECT id FROM users WHERE username = 'Jelena'), 1),
  ((SELECT id FROM events WHERE date_time = '2023-04-25 11:00:00'), (SELECT id FROM users WHERE username = 'User1'), 0),
  ((SELECT id FROM events WHERE date_time = '2023-05-30 12:00:00'), (SELECT id FROM users WHERE username = 'User2'), 1),
  ((SELECT id FROM events WHERE date_time = '2023-06-05 13:00:00'), (SELECT id FROM users WHERE username = 'User3'), 0),
  ((SELECT id FROM events WHERE date_time = '2023-06-05 13:00:00'), (SELECT id FROM users WHERE username = 'User4'), 1);