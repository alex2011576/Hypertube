import supertest from 'supertest';
import { describe, expect } from '@jest/globals';
import { app } from '../app';
import { newUser } from './test_helper_users';
import { clearUsers, getAllUsers } from '../repositories/userRepository';
import { createNewUser } from '../services/users';

const api = supertest(app);

jest.setTimeout(10000);

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

const username = 'test';
const email = 'test@test.com';
const passwordPlain = 'Test!111';
const firstname = 'Test';
const lastname = 'Testoff';

describe('user creation', () => {
	beforeEach(async () => {
		await clearUsers();
		await createNewUser(newUser);
	});

	test('creation succeeds with a new valid payload', async () => {
		const usersAtStart = await getAllUsers();

		await api
			.post('/api/users')
			.send({ username, email, passwordPlain, firstname, lastname })
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await getAllUsers();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const userInDb = usersAtEnd.find((user) => user.username === username);
		if (!userInDb) fail();
		expect(userInDb?.username).toEqual(username);
		expect(userInDb?.firstname).toEqual(firstname);
		expect(userInDb?.lastname).toEqual(lastname);

		expect(sendMailMock).toBeCalledTimes(1);
		expect(sendMailMock.mock.calls[0][0]['to']).toBe(email);
	});

	it.each([
		[{ email, passwordPlain, firstname, lastname }, 'usernameMissing'],
		[{ username, passwordPlain, firstname, lastname }, 'emailMissing'],
		[{ username, email, firstname, lastname }, 'Missing password'],
		[{ username, email, passwordPlain, lastname }, 'Missing first name'],
		[{ username, email, passwordPlain, firstname }, 'Missing last name'],

		[{ username: '          ', email, passwordPlain, firstname, lastname }, 'usernameMissing'],
		[{ username: '					', email, passwordPlain, firstname, lastname }, 'usernameMissing'],
		[{ username: 'tes', email, passwordPlain, firstname, lastname }, 'usernameTooShort'],
		[{ username: 'testtesttesttesttestte', email, passwordPlain, firstname, lastname }, 'usernameTooLong'], //22chars
		[{ username: 'tes<3>', email, passwordPlain, firstname, lastname }, 'usernameInvalid'],
		[{ username: 'te st', email, passwordPlain, firstname, lastname }, 'usernameInvalid'],
		[{ username: 'te	st', email, passwordPlain, firstname, lastname }, 'usernameInvalid'],
		[{ username: 'te{st', email, passwordPlain, firstname, lastname }, 'usernameInvalid'],

		[{ username, email: ' ', passwordPlain, firstname, lastname }, 'emailMissing'],
		[{ username, email: 'testtest.com', passwordPlain, firstname, lastname }, 'emailInvalid'],
		[{ username, email: '@test.com', passwordPlain, firstname, lastname }, 'emailInvalid'],
		[{ username, email: '@test.com', passwordPlain, firstname, lastname }, 'emailInvalid'],
		[{ username, email: 'test@@test.com', passwordPlain, firstname, lastname }, 'emailInvalid'],

		[{ username, email, passwordPlain: 'Test!1', firstname, lastname }, 'passwordTooShort'],
		[{ username, email, passwordPlain: 'Test!111Test!111Test!111Test!111Test!12211T3e', firstname, lastname }, 'passwordTooLong'], //43
		[{ username, email, passwordPlain: 'testtest', firstname, lastname }, 'passwordWeak'],
		[{ username, email, passwordPlain: '12345678', firstname, lastname }, 'passwordWeak'],
		[{ username, email, passwordPlain: '12345678', firstname, lastname }, 'passwordWeak'],
		[{ username, email, passwordPlain: 'T!111111', firstname, lastname }, 'passwordWeak'],
		[{ username, email, passwordPlain: 't!111111', firstname, lastname }, 'passwordWeak'],
		[{ username, email, passwordPlain: 'TestTest!', firstname, lastname }, 'passwordWeak'],
		[{ username, email, passwordPlain: 'Test11111', firstname, lastname }, 'passwordWeak'],

		[{ username, email, passwordPlain, firstname: 'testtesttesttesttesttest', lastname }, 'firstnameTooLong'], //24
		[{ username, email, passwordPlain, firstname: ' ', lastname }, 'firstnameMissing'],
		[{ username, email, passwordPlain, firstname: '123', lastname }, 'firstnameInvalid'],
		[{ username, email, passwordPlain, firstname: '<Test>', lastname }, 'firstnameInvalid'],
		[{ username, email, passwordPlain, firstname: 'tes42', lastname }, 'firstnameInvalid'],
		[{ username, email, passwordPlain, firstname: 'tes@t', lastname }, 'firstnameInvalid'],

		[{ username, email, passwordPlain, firstname, lastname: 'testtesttesttesttesttesttesttesttesttesttes' }, 'lastnameTooLong'], //42
		[{ username, email, passwordPlain, firstname, lastname: ' ' }, 'lastnameMissing'],
		[{ username, email, passwordPlain, firstname, lastname: '123' }, 'lastnameInvalid'],
		[{ username, email, passwordPlain, firstname, lastname: '<Test>' }, 'lastnameInvalid'],
		[{ username, email, passwordPlain, firstname, lastname: 'tes42' }, 'lastnameInvalid'],
		[{ username, email, passwordPlain, firstname, lastname: 'tes@t' }, 'lastnameInvalid'],

		[{ username: 'matcha', email, passwordPlain, firstname, lastname }, 'userNameExists'],
		[{ username: '  matcha  ', email, passwordPlain, firstname, lastname }, 'userNameExists'],
		[{ username: '		matcha', email, passwordPlain, firstname, lastname }, 'userNameExists'],

		[{ username, email: 'matcha@test.com', passwordPlain, firstname, lastname }, 'emailExists'],
		[{ username, email: 'MATCHA@test.com', passwordPlain, firstname, lastname }, 'emailExists'],
		[{ username, email: 'matcha@Test.com', passwordPlain, firstname, lastname }, 'emailExists'],
		[{ username, email: '   matcha@Test.com   ', passwordPlain, firstname, lastname }, 'emailExists'],
		[{ username, email: 'MATCHA@TEST.COM', passwordPlain, firstname, lastname }, 'emailExists']
	])(`creation fails with incorrect user payload %s %s`, async (incorrectUser, expectedErrorMessage) => {
		const usersAtStart = await getAllUsers();

		// console.log(`Payload: ${incorrectUser}, Expected msg: ${expectedErrorMessage}`);
		const res = await api
			.post('/api/users')
			.send(incorrectUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		// console.log(res.body.error);
		expect(res.body.error).toContain(expectedErrorMessage);

		const usersAtEnd = await getAllUsers();
		expect(usersAtEnd).toEqual(usersAtStart);
	});
});
