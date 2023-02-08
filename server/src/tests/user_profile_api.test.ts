import supertest from 'supertest';
import { app } from '../app';
import { describe, expect } from '@jest/globals';
import { newUser, credentialsNewUser, profileDataNewUser, secondUser, credentialsSecondUser } from './test_helper_users';
import { initLoggedUser } from './test_helper_fns';
import { clearSessions } from '../repositories/sessionRepository';
import { clearUsers } from '../repositories/userRepository';
import { createNewUser } from '../services/users';
import { DataURL, InvDataURL, InvDataURL2, InvDataURL3 } from './test_helper_images';

const api = supertest(app);
jest.setTimeout(10000);

let loginRes = <supertest.Response>{};

describe('check access to profile page', () => {
	let id = <string>'';
	beforeAll(async () => {
		await clearUsers();
		await createNewUser(newUser);
		loginRes = await initLoggedUser(newUser.username, credentialsNewUser);
		id = <string>JSON.parse(loginRes.text).id;
	});
	test('logged user can visit profile page', async () => {
		const resFromProfilePage = await api
			.get(`/api/users/${id}`)
			.set({ Authorization: `bearer ${loginRes.body.token}` })
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(resFromProfilePage.body).toBeTruthy();
		expect(resFromProfilePage.text).toContain('lorem');
	});
	test('not logged user cannot access profile page', async () => {
		const resFromProfilePage = await api
			.get(`/api/users/${id}`)
			.expect(401)
			.expect('Content-Type', /application\/json/);

		expect(resFromProfilePage.body.error).toContain('Access denied, no token provided');
	});
	test('should fail when no id in request', async () => {
		const resFromProfilePage = await api
			.get(`/api/users`)
			.set({ Authorization: `bearer ${loginRes.body.token}` })
			.expect(404);
		expect(resFromProfilePage.body.error).toContain('Unknown endpoint');
	});
	test('should fail request with wrong id in request', async () => {
		const resFromProfilePage = await api
			.get(`/api/users/11111111`)
			.set({ Authorization: `bearer ${loginRes.body.token}` })
			.expect(400);
		expect(resFromProfilePage.body.error).toContain(`User doesn't exist`);
	});
	test('fails when no session in db', async () => {
		await clearSessions();
		const resFromProfilePage = await api
			.get(`/api/users/${id}`)
			.set({ Authorization: `bearer ${loginRes.body.token}` })
			.expect(401)
			.expect('Content-Type', /application\/json/);

		expect(resFromProfilePage.body.error).toContain('No sessions found');
	});
});

describe('Check responses and requests to /api/users/:id', () => {
	let resFromProfile = <supertest.Response>{};
	let id = <string>'';
	const getResFromProfile = async (res: supertest.Response) => {
		return await api
			.get(`/api/users/${id}`)
			.set({ Authorization: `bearer ${res.body.token}` })
			.expect(200);
	};
	const getAvatarFromProfile = async (res: supertest.Response) => {
		return await api
			.get(`/api/users/${id}/photo`)
			.set({ Authorization: `bearer ${res.body.token}` })
			.expect(200);
	};
	beforeAll(async () => {
		await clearUsers();
		await createNewUser(newUser);
		loginRes = await initLoggedUser(newUser.username, credentialsNewUser);
		id = <string>JSON.parse(loginRes.text).id;
		resFromProfile = await getResFromProfile(loginRes);
	});
	describe('Check repsonse of GET to /api/users/:id', () => {
		const putToProfile = async () => {
			await api
				.put(`/api/users/${id}`)
				.set({ Authorization: `bearer ${loginRes.body.token}` })
				.send(profileDataNewUser)
				.expect(200);
			// if (res.body.error)
			// 	console.log(res.body.error);
		};

		test('should respond with baseUser + id on 1st access', () => {
			expect(resFromProfile.body).toBeTruthy();
			expect(resFromProfile.text).toContain('lorem');

			expect(JSON.parse(resFromProfile.text)).toEqual({
				id: id,
				username: 'matcha',
				firstname: 'lorem',
				lastname: 'ipsum',
				language: 'ruRU'
			});
			// console.log(JSON.parse(resFromProfile.text));
		});

		test('should respond with UserData on 2nd+ access', async () => {
			await putToProfile();
			const newResFromProfile = await getResFromProfile(loginRes);
			expect(newResFromProfile.body).toBeTruthy();
			expect(JSON.parse(newResFromProfile.text)).toEqual({ ...profileDataNewUser, id: id });
			// console.log(JSON.parse(resFromProfile.text));
		});
	});

	describe('Check PUT requests to /api/users/:id ', () => {
		test('should succeed with code(200)', async () => {
			await api
				.put(`/api/users/${id}`)
				.set({ Authorization: `bearer ${loginRes.body.token}` })
				.send(profileDataNewUser)
				.expect(200);
			const newResFromProfile = await getResFromProfile(loginRes);
			expect(newResFromProfile.body).toBeTruthy();
			expect(JSON.parse(newResFromProfile.text)).toEqual({ ...profileDataNewUser, id: id });
		});
		test('should update photo and succeed with code(200)', async () => {
			await api
				.put(`/api/users/${id}`)
				.set({ Authorization: `bearer ${loginRes.body.token}` })
				.send({...profileDataNewUser, photo: { imageDataUrl: DataURL}})
				.expect(200);
			const newResFromProfile = await getAvatarFromProfile(loginRes);
			expect(newResFromProfile.body).toBeTruthy();
			console.log(newResFromProfile.body);
			
			expect(JSON.parse(newResFromProfile.text)).toEqual({ imageDataUrl: DataURL });
		});

		it.each([
			[{ ...profileDataNewUser, username: undefined }, 'Missing username'],
			[{ ...profileDataNewUser, firstname: undefined }, 'Missing first name'],
			[{ ...profileDataNewUser, lastname: undefined }, 'Missing last name']
		])(`put fails with missing profile payload values`, async (invalidInputs, expectedErrorMessage) => {
			const res = await api
				.put(`/api/users/${id}`)
				.set({ Authorization: `bearer ${loginRes.body.token}` })
				.send(invalidInputs)
				.expect(400)
				.expect('Content-Type', /application\/json/);
			// console.log(res.body.error);
			expect(res.body.error).toContain(expectedErrorMessage);
		});
		it.each([
			[{ ...profileDataNewUser, username: '			' }, 'Missing username'],
			[{ ...profileDataNewUser, username: 'mat' }, 'Username is too short'],
			[{ ...profileDataNewUser, username: 'matcmatchamatchamatchaha' }, 'Username is too long'], //22chars
			[{ ...profileDataNewUser, username: 'tes<3>' }, 'Invalid username'],
			[{ ...profileDataNewUser, username: 'te st' }, 'Invalid username'],
			[{ ...profileDataNewUser, username: 'te	st' }, 'Invalid username'],
			[{ ...profileDataNewUser, username: 'te{st' }, 'Invalid username']
		])(`put fails with misformatted username`, async (invalidInputs, expectedErrorMessage) => {
			const res = await api
				.put(`/api/users/${id}`)
				.set({ Authorization: `bearer ${loginRes.body.token}` })
				.send(invalidInputs)
				.expect(400)
				.expect('Content-Type', /application\/json/);
			// console.log(res.body.error);
			expect(res.body.error).toContain(expectedErrorMessage);
		});	
		it.each([
			[{ ...profileDataNewUser, photo: { imageDataUrl: InvDataURL} }, 'Invalid'],
			[{ ...profileDataNewUser, photo: { imageDataUrl: InvDataURL2} }, 'Invalid'], //22chars
			[{ ...profileDataNewUser, photo: { imageDataUrl: InvDataURL3} }, 'Invalid'],
		])(`put fails with misformatted avatar`, async (invalidInputs, expectedErrorMessage) => {
			const res = await api
				.put(`/api/users/${id}`)
				.set({ Authorization: `bearer ${loginRes.body.token}` })
				.send(invalidInputs)
				.expect(400)
				.expect('Content-Type', /application\/json/);
			// console.log(res.body.error);
			expect(res.body.error).toContain(expectedErrorMessage);
		});	

		describe('check that no duplicates are allowed in username', () => {

			beforeAll(async () => {
				await createNewUser(secondUser);
				loginRes = await initLoggedUser(secondUser.username, credentialsSecondUser);
				id = <string>JSON.parse(loginRes.text).id;
				resFromProfile = await getResFromProfile(loginRes);
			});
			it.each([
				[{ ...secondUser, username: 'matcha' }, 'Username already exists']
			])(`put fails with duplicate value for unique params`, async (invalidInputs, expectedErrorMessage) => {
				const res = await api
					.put(`/api/users/${id}`)
					.set({ Authorization: `bearer ${loginRes.body.token}` })
					.send(invalidInputs)
					.expect(400)
					.expect('Content-Type', /application\/json/);
				//console.log(res.body.error);
				expect(res.body.error).toContain(expectedErrorMessage);
			});
		});
	});
});
