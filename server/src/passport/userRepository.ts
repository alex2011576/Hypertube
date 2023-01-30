/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//prettier-ignore
import { User, NewUserWithHashedPwd } from '../types';
import { getString, getDate, getBoolean} from '../dbUtils';
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
		activationCode: getString(row['activation_code']),
	};
};

//for tests
const getAllUsers = async (): Promise<User[]> => {
	const res = await pool.query('select * from users');
	return res.rows.map((row) => userMapper(row));
};

const getIdList = async (): Promise<{ id: string }[]> => {
	const res = await pool.query('select id from users');
	return res.rows as { id: string; }[];
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

const findUserByUsername = async (username: string): Promise<User | undefined> => {
	const query = {
		text: 'select * from users where username = $1',
		values: [username]
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
		text: 'select * from users where email = $1',
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
		text: 'select * from users where activation_code = $1',
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

const getUserByUserId = async (userId: string): Promise<User| undefined> => {
	const query = {
		text: 'select * from users where id = $1',
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
	getUserByUserId
};
