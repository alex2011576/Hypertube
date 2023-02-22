DROP TABLE IF EXISTS watch_history;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS downloads;
DROP TABLE IF EXISTS update_email_requests;
DROP TABLE IF EXISTS password_reset_requests;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS states_expire_table;
DROP TABLE IF EXISTS users;
DROP FUNCTION expire_table_delete_old_rows();