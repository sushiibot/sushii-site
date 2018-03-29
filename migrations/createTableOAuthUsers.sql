CREATE TABLE IF NOT EXISTS oauth_users (
  id TEXT PRIMARY KEY,
  access_token TEXT NOT NULL,
  expires_in TEXT NOT NULL,
  refresh_token TEXT NOT NULL
)
