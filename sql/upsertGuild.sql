INSERT INTO oauth_guilds (
  user_id,
  guild_id,
  is_owner,
  permissions
) VALUES (
  $1,
  $2,
  $3,
  $4
) ON CONFLICT(user_id, guild_id) DO UPDATE SET
  is_owner = $3,
  permissions = $4;
