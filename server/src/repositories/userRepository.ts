/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//prettier-ignore
import { User, NewUserWithHashedPwd, New42UserWithHashedPwd, NewGHUserWithHashedPwd, UserData, UserProfile } from '../types';
import { getString, getDate, getBoolean, getStringOrUndefined } from '../dbUtils';
import { ValidationError } from '../errors';
import pool from '../db';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userMapper = (row: any): User => {
	return {
		id: getString(row['id']),
		username: getString(row['username']),
		email: getString(row['email']),
		passwordHash: getString(row['password_hash']),
		firstname: getString(row['firstname']),
		lastname: getString(row['lastname']),
		createdAt: getDate(row['created_at']),
		isActive: getBoolean(row['is_active']),
		activationCode: getString(row['activation_code'])
	};
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userDataMapper = (row: any): UserData => {
	return {
		id: getString(row['id']),
		username: getString(row['username']),
		firstname: getString(row['firstname']),
		lastname: getString(row['lastname']),
		language: getString(row['language'])
	};
};

//for tests
const getAllUsers = async (): Promise<User[]> => {
	const res = await pool.query('select * from users');
	return res.rows.map((row) => userMapper(row));
};

const getIdList = async (): Promise<{ id: string }[]> => {
	const res = await pool.query('select id from users');
	return res.rows as { id: string }[];
};

const getPasswordHash = async (userId: string): Promise<string> => {
	const res = await pool.query({ text: 'select password_hash from users where id = $1', values: [userId] });
	return getString(res.rows[0]['password_hash']);
};

const addNewUser = async (newUser: NewUserWithHashedPwd): Promise<User> => {
	const query = {
		text: 'insert into users(username, email, password_hash, firstname, lastname, activation_code) values($1, $2, $3, $4, $5, $6) returning *',
		values: [newUser.username, newUser.email, newUser.passwordHash, newUser.firstname, newUser.lastname, newUser.activationCode]
	};

	let res;
	try {
		res = await pool.query(query);
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === 'duplicate key value violates unique constraint "users_username_key"') {
				throw new ValidationError('Username already exists');
			}
			if (error.message === 'duplicate key value violates unique constraint "users_email_key"') {
				throw new ValidationError('This email was already used');
			}
		}
		throw error;
	}

	return userMapper(res.rows[0]);
};

const addNew42User = async (newUser: New42UserWithHashedPwd): Promise<User> => {
	const query = {
		text: 'insert into users(username, email, password_hash, firstname, lastname, activation_code, is_active, id_42, avatar) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
		values: [
			newUser.username,
			newUser.email,
			newUser.passwordHash,
			newUser.firstname,
			newUser.lastname,
			newUser.activationCode,
			true,
			newUser.id42,
			newUser.avatar
		]
	};

	let res;
	try {
		res = await pool.query(query);
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === 'duplicate key value violates unique constraint "users_username_key"') {
				throw new ValidationError('Username already exists');
			}
			if (error.message === 'duplicate key value violates unique constraint "users_email_key"') {
				throw new ValidationError('This email was already used');
			}
		}
		throw error;
	}

	return userMapper(res.rows[0]);
};

const addNewGHUser = async (newUser: NewGHUserWithHashedPwd): Promise<User> => {
	const query = {
		text: 'insert into users(username, email, password_hash, firstname, lastname, activation_code, is_active, id_git_hub, avatar) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
		values: [
			newUser.username,
			newUser.email,
			newUser.passwordHash,
			newUser.firstname,
			newUser.lastname,
			newUser.activationCode,
			true,
			newUser.idGitHub,
			newUser.avatar
		]
	};

	let res;
	try {
		res = await pool.query(query);
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === 'duplicate key value violates unique constraint "users_username_key"') {
				throw new ValidationError('Username already exists');
			}
			if (error.message === 'duplicate key value violates unique constraint "users_email_key"') {
				throw new ValidationError('This email was already used');
			}
		}
		throw error;
	}

	return userMapper(res.rows[0]);
};

const findUserByUsername = async (username: string): Promise<User | undefined> => {
	const query = {
		text: 'select id, username, email, password_hash, firstname, lastname, created_at, is_active, activation_code from users where username = $1',
		values: [username]
	};
	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return userMapper(res.rows[0]);
};

const findUserBy42id = async (id42: number): Promise<User | undefined> => {
	const query = {
		text: 'select id, username, email, password_hash, firstname, lastname, created_at, is_active, activation_code from users where id_42 = $1',
		values: [id42]
	};
	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return userMapper(res.rows[0]);
};
const findUserByGHid = async (idGitHub: number): Promise<User | undefined> => {
	const query = {
		text: 'select id, username, email, password_hash, firstname, lastname, created_at, is_active, activation_code from users where id_git_hub = $1',
		values: [idGitHub]
	};
	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return userMapper(res.rows[0]);
};

const isUserById = async (id: string): Promise<boolean> => {
	const query = {
		text: 'select username from users where id = $1',
		values: [id]
	};
	const res = await pool.query(query);
	if (!res.rowCount) {
		return false;
	}
	return true;
};

const findUserByEmail = async (email: string): Promise<User | undefined> => {
	const query = {
		text: 'select id, username, email, password_hash, firstname, lastname, created_at, is_active, activation_code from users where email = $1',
		values: [email]
	};
	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return userMapper(res.rows[0]);
};

const findUserByActivationCode = async (activationCode: string): Promise<User | undefined> => {
	const query = {
		text: 'select id, username, email, password_hash, firstname, lastname, created_at, is_active, activation_code from users where activation_code = $1',
		values: [activationCode]
	};
	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return userMapper(res.rows[0]);
};

const setUserAsActive = async (activationCode: string): Promise<void> => {
	const query = {
		text: 'update users set is_active = true where activation_code = $1',
		values: [activationCode]
	};
	await pool.query(query);
};

const setUser42id = async (userId: string, id42: number): Promise<void> => {
	const query = {
		text: 'update users set id_42 = $1 where id = $2',
		values: [id42, userId]
	};
	await pool.query(query);
};

const setUserGHid = async (userId: string, idGitHub: number): Promise<void> => {
	const query = {
		text: 'update users set id_git_hub = $1 where id = $2',
		values: [idGitHub, userId]
	};
	await pool.query(query);
};

const updateUserPassword = async (userId: string, passwordHash: string): Promise<void> => {
	const query = {
		text: 'update users set password_hash = $1 where id = $2',
		values: [passwordHash, userId]
	};
	await pool.query(query);
};

const updateUserEmail = async (userId: string, email: string): Promise<void> => {
	const query = {
		text: 'update users set email = $1 where id = $2',
		values: [email, userId]
	};
	try {
		await pool.query(query);
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === 'duplicate key value violates unique constraint "users_email_key"') {
				throw new ValidationError('This email was already used');
			}
		}
		throw error;
	}
};

const clearUsers = async (): Promise<void> => {
	await pool.query('truncate table users');
};

const getUserByUserId = async (userId: string): Promise<User | undefined> => {
	const query = {
		text: 'select id, username, email, password_hash, firstname, lastname, created_at, is_active, activation_code from users where id = $1',
		values: [userId]
	};
	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return userMapper(res.rows[0]);
};

const findUsernameById = async (userId: string): Promise<string | undefined> => {
	const query = {
		text: 'select username from users where id = $1',
		values: [userId]
	};

	const res = await pool.query(query);

	if (!res.rowCount) {
		return undefined;
	}
	return getString(res.rows[0]['username']);
};

const deleteUserByEmail = async (email: string): Promise<void> => {
	const query = {
		text: 'delete from users where email = $1',
		values: [email]
	};
	await pool.query(query);
};

const getUserDataByUserId = async (userId: string): Promise<UserData | undefined> => {
	const query = {
		text: 'select id, username, firstname, lastname, language from users where id = $1',
		values: [userId]
	};
	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return userDataMapper(res.rows[0]);
};

const getUserAvatarByUserId = async (userId: string): Promise<string | undefined> => {
	const query = {
		text: 'select avatar from users where id = $1',
		values: [userId]
	};
	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return getStringOrUndefined(res.rows[0]['avatar']);
};

const updateUserDataByUserId = async (userId: string, updatedProfile: UserProfile): Promise<void> => {
	const query = {
		text: 'update users set firstname = $2, lastname = $3, username = $4, language = $5, avatar = $6 where id = $1',
		values: [
			userId,
			updatedProfile.firstname,
			updatedProfile.lastname,
			updatedProfile.username,
			updatedProfile.language,
			updatedProfile.photo?.imageDataUrl
		]
	};
	await pool.query(query);
};

export {
	getAllUsers,
	getIdList,
	getPasswordHash,
	addNewUser,
	clearUsers,
	findUserByUsername,
	findUserByActivationCode,
	setUserAsActive,
	findUserByEmail,
	updateUserPassword,
	updateUserEmail,
	isUserById,
	findUsernameById,
	getUserByUserId,
	findUserBy42id,
	deleteUserByEmail,
	addNew42User,
	setUser42id,
	findUserByGHid,
	addNewGHUser,
	setUserGHid,
	userDataMapper,
	getUserDataByUserId,
	updateUserDataByUserId,
	getUserAvatarByUserId
};
