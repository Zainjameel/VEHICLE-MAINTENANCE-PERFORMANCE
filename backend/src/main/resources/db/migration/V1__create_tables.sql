CREATE TABLE IF NOT EXISTS twins (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT
);

CREATE TABLE IF NOT EXISTS creators (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT
);

CREATE TABLE IF NOT EXISTS insights (
  id BIGSERIAL PRIMARY KEY,
  insight_name TEXT NOT NULL,
  twin_id BIGINT NOT NULL REFERENCES twins(id),
  creator_id BIGINT NOT NULL REFERENCES creators(id),
  projected_savings_usd NUMERIC(12,2) NOT NULL,
  assignee TEXT,
  date_closed TIMESTAMP NULL,
  last_active TIMESTAMP NULL
);