DROP TABLE IF EXISTS pings CASCADE;
DROP TABLE IF EXISTS user_sites CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS monitor_state CASCADE;

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Sites belonging to a user
CREATE TABLE user_sites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    check_interval INT NOT NULL, -- in seconds, minutes, etc.
    notifications_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Append-only table of ping results
CREATE TABLE pings (
    id BIGSERIAL PRIMARY KEY,
    user_site_id BIGINT REFERENCES user_sites(id) ON DELETE SET NULL,
    checked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    status TEXT NOT NULL CHECK (status IN ('up','down','error')),
    latency_ms INT
);

CREATE INDEX idx_user_sites_user ON user_sites (user_id);
CREATE INDEX idx_pings_site ON pings (user_site_id);
CREATE INDEX idx_pings_checked_at ON pings (checked_at);

CREATE TABLE monitor_state (
  monitor_id BIGINT PRIMARY KEY REFERENCES user_sites(id) ON DELETE CASCADE,
  last_check TIMESTAMPTZ,
  status BOOLEAN,
  last_status_code INT,
  last_latency_ms INT,
  consecutive_fails INT DEFAULT 0,
  consecutive_successes INT DEFAULT 0
);