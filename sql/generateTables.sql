CREATE TABLE users (
  user_uid        UUID NOT NULL PRIMARY KEY,
  username        VARCHAR(50) NOT NULL,
  email           VARCHAR(50) NOT NULL,
  date_created    TIMESTAMP DEFAULT NOW(),
  date_updated    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE events (
  event_uid       UUID NOT NULL PRIMARY KEY,
  event_type      SMALLINT REFERENCES event_types(type_id),
  age_group        VARCHAR(50),
  skill_level     SMALLINT,
  event_location  POINT NOT NULL,
  date_time       TIMESTAMP NOT NULL,
  host_user_uid   UUID REFERENCES users(user_uid),
  date_created    TIMESTAMP DEFAULT NOW(),
  date_updated    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE attendees (
  event_uid       UUID REFERENCES events(event_uid),
  user_uid        UUID REFERENCES users(user_uid),
  rsvp_status     SMALLINT NOT NULL,
  PRIMARY KEY (event_uid, user_uid)
);

CREATE TABLE event_types (
  type_id         SERIAL PRIMARY KEY,
  type_name       VARCHAR(50) NOT NULL
);
