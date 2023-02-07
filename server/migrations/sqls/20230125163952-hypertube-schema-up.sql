create table users
(
	id bigserial primary key,
	username varchar not null unique,
	email varchar not null unique,
	password_hash varchar not null,
	firstname varchar not null,
	lastname varchar not null,
	id_42 int default null,
	id_git_hub int default null,
	language varchar not null default 'enUS',
	avatar varchar default null,
	is_active boolean not null default false,
	created_at timestamptz not null default now(),
	activation_code varchar not null unique
);

create table user_sessions
(
	session_id uuid default gen_random_uuid() primary key,
	user_id bigserial not null,
	username varchar not null,
	email varchar not null,
	language varchar not null default 'enUS',
	expires_at timestamptz not null default now() + time '24:00'
);

create index user_sessions_user_id on user_sessions (user_id);

create table states_expire_table (
	state uuid default gen_random_uuid() primary key,
	created_at timestamp not null default now()
);

create table password_reset_requests
(
	token uuid default gen_random_uuid() primary key,
	user_id bigserial not null,
	expires_at timestamptz not null default now() + time '06:00'
);

create index password_reset_requests_user_id on password_reset_requests (user_id);

create table update_email_requests
(
	token uuid default gen_random_uuid() primary key,
	user_id bigserial not null,
	email varchar not null,
	expires_at timestamptz not null default now() + time '06:00'
);

create index update_email_requests_user_id on update_email_requests (user_id);

CREATE FUNCTION expire_table_delete_old_rows() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  DELETE FROM states_expire_table WHERE created_at < NOW() - INTERVAL '1 minute';
  RETURN NEW;
END;
$$;

CREATE TRIGGER expire_table_delete_old_rows_trigger
    BEFORE INSERT ON states_expire_table
    EXECUTE PROCEDURE expire_table_delete_old_rows();