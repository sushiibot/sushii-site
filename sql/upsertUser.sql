INSERT INTO oauth_users (
  id,
  access_token,
  expires_at,
  refresh_token
) VALUES (
  $1,
  $2,
  $3,
  $4
) ON CONFLICT(id) DO UPDATE SET
  access_token = $2,
  expires_at = $3;
