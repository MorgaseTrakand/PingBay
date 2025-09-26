-- Drop tables if they already exist (for dev/resetting)
DROP TABLE IF EXISTS pings CASCADE;
DROP TABLE IF EXISTS user_sites CASCADE;
DROP TABLE IF EXISTS sites CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Sites table (unique URL metadata)
CREATE TABLE sites (
    id BIGSERIAL PRIMARY KEY,
    url TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- User-Sites table (subscription/monitor config)
CREATE TABLE user_sites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    site_id BIGINT NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    frequency_seconds INT NOT NULL DEFAULT 300, -- default 5min
    enabled BOOLEAN DEFAULT TRUE,
    notify_email BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id, site_id) -- one subscription per user-site combo
);

-- Pings table (append-only checks)
CREATE TABLE pings (
    id BIGSERIAL PRIMARY KEY,
    site_id BIGINT NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    user_site_id BIGINT REFERENCES user_sites(id) ON DELETE SET NULL,
    checked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    status TEXT NOT NULL CHECK (status IN ('up','down','error')),
    latency_ms INT,
    http_status INT,
    error_message TEXT
);

-- Helpful indexes
CREATE INDEX idx_pings_site_time ON pings (site_id, checked_at DESC);
CREATE INDEX idx_user_sites_user ON user_sites (user_id);
CREATE INDEX idx_user_sites_site ON user_sites (site_id);