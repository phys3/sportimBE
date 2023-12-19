CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE TABLE users (
  id        UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  username  VARCHAR(50) NOT NULL,
  email     VARCHAR(50) NOT NULL,
  date_created TIMESTAMP DEFAULT NOW(),
  date_updated TIMESTAMP DEFAULT NOW()
);

CREATE TABLE event_types (
  id         SERIAL PRIMARY KEY,
  type_name  VARCHAR(50) NOT NULL
);

CREATE TABLE events (
  id            UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type    SMALLINT REFERENCES event_types(id),
  age_group     VARCHAR(50),
  skill_level   SMALLINT,
  event_location GEOGRAPHY(POINT, 4326) NOT NULL,
  date_time     TIMESTAMP NOT NULL,
  host_user_uid UUID REFERENCES users(id),
  date_created  TIMESTAMP DEFAULT NOW(),
  date_updated  TIMESTAMP DEFAULT NOW()
);

CREATE INDEX events_location_gist
ON events
USING gist (event_location);

CREATE TABLE attendees (
  event_id     UUID REFERENCES events(id),
  user_id      UUID REFERENCES users(id),
  rsvp_status  SMALLINT NOT NULL,
  PRIMARY KEY (event_id, user_id)
);