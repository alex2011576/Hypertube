import { describe, expect } from '@jest/globals';
import supertest from 'supertest';

import { app } from '../app';
import { createNewUser } from '../services/users';
import { credentialsNewUser, newUser } from './test_helper_users';
import { findSessionsByUserId } from '../repositories/sessionRepository';
import { clearUsers, findUserByUsername } from '../repositories/userRepository';

const api = supertest(app);

jest.setTimeout(10000);

const username = 'matcha';
const password = 'Test!111';

describe('user login', () => {
	beforeEach(async () => {
		await clearUsers();
		await createNewUser(newUser);
	});

	test('activated user can log in', async () => {
		const user = await findUserByUsername(newUser.username);
		if (user) {
			const activationCode = user.activationCode;

			await api.post(`/api/users/activate/${activationCode}`).expect(200);

			const activeUser = await findUserByUsername(newUser.username);
			if (activeUser) {
				expect(activeUser.isActive).toBe(true);
			}
		}

		const res = await api
			.post('/api/login')
			.send(credentialsNewUser)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const sessions = await findSessionsByUserId(res.body.id);
		expect(sessions).toBeTruthy();
		expect(sessions?.length).toBe(1);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		expect(res.body).toHaveProperty('token');
	});

	test('login fail with non active user', async () => {
		const user = await findUserByUsername(newUser.username);
		if (user) {
			const nonActiveUser = await findUserByUsername(newUser.username);
			if (nonActiveUser) {
				expect(nonActiveUser.isActive).toBe(false);
			}
		}
		const res = await api
			.post('/api/login')
			.send(credentialsNewUser)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		expect(res.body.error).toContain('loginAccountNotActivated');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const sessions = await findSessionsByUserId(res.body.id);
		expect(sessions).toBeFalsy();
		expect(res.body).not.toHaveProperty('token');
	});

	test('login fails with non existing user', async () => {
		const res = await api
			.post('/api/login')
			.send({ username: 'wrong', password: 'Wrong!111' })
			.expect(401)
			.expect('Content-Type', /application\/json/);

		expect(res.body.error).toContain('loginUserNotFound');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const sessions = await findSessionsByUserId(res.body.id);
		expect(sessions).toBeFalsy();
		expect(res.body).not.toHaveProperty('token');
	});

	test('login fails with wrong password', async () => {
		const res = await api
			.post('/api/login')
			.send({ username: newUser.username, password: 'Wrong!111' })
			.expect(401)
			.expect('Content-Type', /application\/json/);

		expect(res.body.error).toContain('loginWrongPassword');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const sessions = await findSessionsByUserId(res.body.id);
		expect(sessions).toBeFalsy();
		expect(res.body).not.toHaveProperty('token');
	});

	it.each([
		[{ password }, 'usernameMissing'],
		[{ username }, 'Missing password'],

		[{ username: '          ' }, 'usernameMissing'],
		[{ username: '			' }, 'usernameMissing'],

		[{ username: 'mat', password }, 'usernameTooShort'],
		[{ username: 'matcmatchamatchamatchaha', password }, 'usernameTooLong'], //22chars
		[{ username: 'tes<3>', password }, 'usernameInvalid'],
		[{ username: 'te st', password }, 'usernameInvalid'],
		[{ username: 'te	st', password }, 'usernameInvalid'],
		[{ username: 'te{st', password }, 'usernameInvalid'],

		[{ username, password: 'Test!1' }, 'passwordTooShort'],
		[{ username, password: 'Test!111Test!111Test!111Test!111Test!111Te2' }, 'passwordTooLong'], //43
		[{ username, password: 'testtest' }, 'passwordWeak'],
		[{ username, password: '12345678' }, 'passwordWeak'],
		[{ username, password: '12345678' }, 'passwordWeak'],
		[{ username, password: 'T!111111' }, 'passwordWeak'],
		[{ username, password: 't!111111' }, 'passwordWeak'],
		[{ username, password: 'TestTest!' }, 'passwordWeak'],
		[{ username, password: 'Test11111' }, 'passwordWeak']
	])(`login fails with incorrect input values (failed by basic validators)`, async (invalidInputs, expectedErrorMessage) => {
		// console.log(`Payload: ${incorrectUser}, Expected msg: ${expectedErrorMessage}`);
		const res = await api
			.post('/api/login')
			.send(invalidInputs)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		// console.log(res.body.error);
		expect(res.body.error).toContain(expectedErrorMessage);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const sessions = await findSessionsByUserId(res.body.id);
		expect(sessions).toBeFalsy();
		expect(res.body).not.toHaveProperty('token');
	});
});
