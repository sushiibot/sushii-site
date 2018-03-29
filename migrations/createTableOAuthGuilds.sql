CREATE TABLE IF NOT EXISTS oauth_guilds (
  user_id TEXT,
  guild_id TEXT,
  is_owner BOOLEAN NOT NULL,
  permissions TEXT NOT NULL,
  PRIMARY KEY(user_id, guild_id)
)
