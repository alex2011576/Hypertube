import supertest from 'supertest';
import { app } from '../app';
import { describe, expect } from '@jest/globals';
import { findPasswordResetRequestByUserId, clearPasswordResetRequestsTable } from '../repositories/passwordResetRequestRepository';
import { clearUsers, findUserByUsername } from '../repositories/userRepository';
import { findSessionsByUserId } from '../repositories/sessionRepository';
import { createNewUser } from '../services/users';
import { newUser } from './test_helper_users';

const api = supertest(app);

jest.setTimeout(100000);
const sendMailMock = jest.fn(); // this will return undefined if .sendMail() is called

jest.mock('nodemailer', () => ({
	createTransport: jest.fn().mockImplementation(() => {
		return {
			sendMail: sendMailMock
		};
	})
}));

beforeEach(() => {
	sendMailMock.mockClear();
});

describe('send password reset link on forgot pwd request', () => {
	beforeEach(async () => {
		await clearUsers();
		await clearPasswordResetRequestsTable();
		await createNewUser(newUser);
	});

	test('reset password link is sent to active user with correct email', async () => {
		const user = await findUserByUsername(newUser.username);

		//activate first
		const activationCode = user?.activationCode;
		// console.log(activationCode);
		await api.post(`/api/users/activate/${activationCode}`).expect(200);

		const activeUser = await findUserByUsername(newUser.username);
		if (!activeUser) {
			fail();
		}
		// console.log(activeUser);
		expect(activeUser.isActive).toBe(true);

		await api.post('/api/users/forgot_password').send({ email: newUser.email }).expect(201);

		expect(sendMailMock).toBeCalledTimes(1);
		expect(sendMailMock.mock.calls[0][0]['to']).toBe(newUser.email);
	});

	test('fails on non-activated email', async () => {
		const user = await findUserByUsername(newUser.username);
		if (!user) fail();

		const res = await api.post('/api/users/forgot_password').send({ email: user.email }).expect(400);

		expect(res.body.error).toContain('loginAccountNotActivated');
		expect(sendMailMock).toBeCalledTimes(0);
	});

	test('fails with incorrect (not valid) email', async () => {
		const res = await api
			.post('/api/users/forgot_password')
			.send({ email: 'wrong.com' })
			.expect(400)
			.expect('Content-Type', /application\/json/);
		expect(res.body.error).toContain('emailInvalid');
	});

	test('fails with valid but not existing email', async () => {
		const res = await api
			.post('/api/users/forgot_password')
			.send({ email: 'wrong@wrong.com' })
			.expect(400)
			.expect('Content-Type', /application\/json/);
		expect(res.body.error).toContain(`usersEmailNotFound`);
	});
});

describe('visit password-reset link', () => {
	beforeEach(async () => {
		//create and activate user
		await clearUsers();
		await clearPasswordResetRequestsTable();
		await createNewUser(newUser);
		const user = await findUserByUsername(newUser.username);
		const activationCode = user?.activationCode;

		await api.post(`/api/users/activate/${activationCode}`).expect(200);

		const activeUser = await findUserByUsername(newUser.username);
		if (!activeUser) fail();

		expect(activeUser.isActive).toBe(true);

		await api.post('/api/users/forgot_password').send({ email: activeUser.email }).expect(201);
		expect(sendMailMock).toBeCalledTimes(1);
		expect(sendMailMock.mock.calls[0][0]['to']).toBe(newUser.email);
	});

	test('success with valid existing token', async () => {
		const user = await findUserByUsername(newUser.username);
		if (!user) fail();

		const resetRequest = await findPasswordResetRequestByUserId(user.id);
		if (!resetRequest) fail();
		await api.get(`/api/users/forgot_password/${resetRequest.token}`).expect(200);
	});

	it.each([
		[undefined, 'tokenPasswordResetInvalid'],
		[null, 'tokenPasswordResetInvalid'],
		['', 'tokenPasswordMissing'],
		['    ', 'tokenPasswordMissing'],
		['		', 'tokenPasswordMissing'],

		['12345', 'tokenPasswordResetInvalid'], //too short
		['1234567890123456789012345678901234567890', 'tokenPasswordResetInvalid'], //too long 40chars

		['2>-)837428374t-2983<32v74slk-dkfhkhf', 'tokenPasswordResetInvalidFormat'],
		['!0831j37-7cbb-4ca0-91cb-5fda0cee63!3', 'tokenPasswordResetInvalidFormat'],
		['42e7ed49-58f4-4ca7-b478-3d3805a7bb7>', 'tokenPasswordResetInvalidFormat']
	])('fails with incorectly formatted token %s %s', async (invalidToken, expectedErrorMessage) => {
		// console.log(`Payload: ${invalidToken}, Expected msg: ${expectedErrorMessage}`);
		const res = await api.get(`/api/users/forgot_password/${invalidToken}`).expect(400);
		if (!res.body.error) fail();
		expect(res.body.error).toContain(expectedErrorMessage);
	});
});

describe('set new password', () => {
	beforeEach(async () => {
		//create and activate user
		await clearUsers();
		await clearPasswordResetRequestsTable();
		await createNewUser(newUser);
		const user = await findUserByUsername(newUser.username);
		if (!user) fail();
		const activationCode = user?.activationCode;

		await api.post(`/api/users/activate/${activationCode}`).expect(200);

		const activeUser = await findUserByUsername(newUser.username);
		if (!activeUser) fail();

		expect(activeUser.isActive).toBe(true);

		await api.post('/api/users/forgot_password').send({ email: activeUser.email }).expect(201);
		expect(sendMailMock).toBeCalledTimes(1);
		expect(sendMailMock.mock.calls[0][0]['to']).toBe(newUser.email);
	});

	test('pwd successfully reset on valid link/token/proper pwd', async () => {
		const user = await findUserByUsername(newUser.username);
		if (!user) fail();

		const resetRequest = await findPasswordResetRequestByUserId(user.id);
		if (!resetRequest) fail();

		await api.get(`/api/users/forgot_password/${resetRequest.token}`).expect(200);

		await api.post(`/api/users/forgot_password/${resetRequest.token}`).send({ password: 'NewTest!11111' }).expect(200);

		//login with new pwd
		const res = await api
			.post('/api/login')
			.send({ username: newUser.username, password: 'NewTest!11111' })
			.expect(200)
			.expect('Content-Type', /application\/json/);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const sessions = await findSessionsByUserId(res.body.id);
		expect(sessions).toBeTruthy();
		expect(sessions?.length).toBe(1);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		expect(res.body).toHaveProperty('token');
	});

	it.each([
		[undefined, 'tokenPasswordResetInvalid'],
		[null, 'tokenPasswordResetInvalid'],

		['12345', 'tokenPasswordResetInvalid'], //too short
		['1234567890123456789012345678901234567890', 'tokenPasswordResetInvalid'], //too long 40chars

		['2>-)837428374t-2983<32v74slk-dkfhkhf', 'tokenPasswordResetInvalidFormat'],
		['!0831j37-7cbb-4ca0-91cb-5fda0cee63!3', 'tokenPasswordResetInvalidFormat'],
		['42e7ed49-58f4-4ca7-b478-3d3805a7bb7>', 'tokenPasswordResetInvalidFormat']
	])('fails to set new pwd with incorrect token %s %s', async (invalidToken, expectedErrorMessage) => {
		const res = await api.post(`/api/users/forgot_password/${invalidToken}`).send({ password: 'NewTest!111' }).expect(400);
		if (!res.body.error) fail();
		expect(res.body.error).toContain(expectedErrorMessage);
	});

	test('fails to set new pwd when no token found in db', async () => {
		const user = await findUserByUsername(newUser.username);
		if (!user) fail();

		const resetRequest = await findPasswordResetRequestByUserId(user.id);
		if (!resetRequest) fail();

		await clearPasswordResetRequestsTable();

		const res = await api.post(`/api/users/forgot_password/${resetRequest.token}`).send({ password: 'NewTest!111' }).expect(400);
		if (!res.body.error) fail();
		expect(res.body.error).toContain('Reset password code is missing or expired. Please try again');
	});

	it.each([
		[undefined, 'Missing password'],
		[null, 'Missing password'],
		['', 'Missing password'],

		['Test!1', 'passwordTooShort'],
		['Test!111Test!111Test!111Test!111Test!12211T3e', 'passwordTooLong'], //43
		['testtest', 'passwordWeak'],
		['12345678', 'passwordWeak'],
		['12345678', 'passwordWeak'],
		['T!111111', 'passwordWeak'],
		['t!111111', 'passwordWeak'],
		['TestTest!', 'passwordWeak'],
		['Test11111', 'passwordWeak']
	])('fails to set new pwd incorrect password provided %s %s', async (invalidPassword, expectedErrorMessage) => {
		const user = await findUserByUsername(newUser.username);
		if (!user) fail();

		const resetRequest = await findPasswordResetRequestByUserId(user.id);
		if (!resetRequest) fail();

		const res = await api.post(`/api/users/forgot_password/${resetRequest.token}`).send({ password: invalidPassword }).expect(400);
		if (!res.body.error) fail();
		expect(res.body.error).toContain(expectedErrorMessage);
	});
});
