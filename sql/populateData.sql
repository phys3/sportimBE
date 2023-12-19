-- Insert dummy data into the 'users' table
INSERT INTO users (id, username, email)
VALUES 
  ('234b91c4-db16-446a-9815-e77a6712d3f2', 'Marino', 'marin@gmail.com'),
  ('0aff2945-fe7c-4ac9-9f04-04f35abfa6f6', 'Dario', 'da@gmail.com'),
  ('1c868365-07a1-4db0-86af-0856130cc7ee', 'Lovro', 'lov@gmail.com'),
  ('36698ab8-e43f-4ad6-9db7-7bf7ff914c7d', 'Jelena', 'jel@gmail.com');

-- Insert dummy data into the 'event_types' table
INSERT INTO event_types (id, type_name)
VALUES 
  (1, 'Conference'),
  (2, 'Seminar'),
  (3, 'Workshop');

INSERT INTO events (id, event_type, age_group, skill_level, event_location, date_time, host_user_id)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 1, '10-12', 1, '(0, 0)', '2023-01-01 10:00:00', '234b91c4-db16-446a-9815-e77a6712d3f2'),
  ('22222222-2222-2222-2222-222222222222', 1, '10-12', 1, '(1, 1)', '2023-02-15 14:30:00', '0aff2945-fe7c-4ac9-9f04-04f35abfa6f6'),
  ('33333333-3333-3333-3333-333333333333', 2, '10-12', 1, '(2, 2)', '2023-03-20 09:00:00', '1c868365-07a1-4db0-86af-0856130cc7ee');

-- Insert dummy data into the 'attendees' table
INSERT INTO attendees (event_id, user_id, rsvp_status)
VALUES 
  ('11111111-1111-1111-1111-111111111111', '234b91c4-db16-446a-9815-e77a6712d3f2', 1),
  ('11111111-1111-1111-1111-111111111111', '0aff2945-fe7c-4ac9-9f04-04f35abfa6f6', 0),
  ('22222222-2222-2222-2222-222222222222', '1c868365-07a1-4db0-86af-0856130cc7ee', 1),
  ('33333333-3333-3333-3333-333333333333', '36698ab8-e43f-4ad6-9db7-7bf7ff914c7d', 1);
