DROP TABLE IF EXISTS update_email_requests;
DROP TABLE IF EXISTS password_reset_requests;
DROP TABLE IF EXISTS user_sessions;
DROP TABLE IF EXISTS states_expire_table;
DROP TABLE IF EXISTS users;
drop function expire_table_delete_old_rows();