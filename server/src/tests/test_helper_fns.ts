/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import supertest from 'supertest';
import { app } from '../app';
import { DataURL } from './test_helper_images';
import { createNewUser } from '../services/users';
import { NewUser } from '../types';
import { clearUsers, findUserByUsername } from '../repositories/userRepository';
import { TokenAndId } from './test_helper';
import { credentialsNewUser, ProfileData, Credentials, profileDataNewUser } from './test_helper_users';

export const api = supertest(app);

export let id = <string>'';
export let token = <string>'';
export let loginRes = <supertest.Response>{};

export const initLoggedUser = async (username: string, credentials: Credentials) => {
	const user = await findUserByUsername(username);
	const activationCode = user?.activationCode;
	await api.post(`/api/users/activate/${activationCode}`);
	const res = await api.post('/api/login').send(credentials).expect(200);
	return res;
};

export const putToProfile = async (id: string) => {
	await api
		.put(`/api/users/${id}/profile`)
		.set({ Authorization: `bearer ${loginRes.body.token}` })
		.send(profileDataNewUser)
		.expect(200);
	// if (res.body.error)
	// 	console.log(res.body.error);
};

export const postToPhotos = async (id: string) => {
	await api
		.post(`/api/users/${id}/photos`)
		.set({ Authorization: `bearer ${loginRes.body.token}` })
		.send({ images: [{ dataURL: DataURL }] })
		.expect(200);
};

export const createAndLoginUser = async (user: NewUser) => {
	await clearUsers();
	await createNewUser(user);
	loginRes = await initLoggedUser(user.username, credentialsNewUser);
	id = <string>JSON.parse(loginRes.text).id;
	token = <string>JSON.parse(loginRes.text).token;
	return { id, token };
};

export const loginAndPrepareUser = async (user: NewUser, credentials: Credentials, profileData: ProfileData) => {
	await createNewUser(user);
	const loginData = await initLoggedUser(user.username, credentials);
	await prepareTestUser(loginData.body, profileData);
	return { id: loginData.body.id, token: loginData.body.token };
};

export const prepareTestUser = async (loginData: TokenAndId, profileData: object) => {
	await api
		.put(`/api/users/${loginData.id}/profile`)
		.set({ Authorization: `bearer ${loginData.token}` })
		.send(profileData)
		.expect(200);

	await api
		.post(`/api/users/${loginData.id}/photos`)
		.set({ Authorization: `bearer ${loginData.token}` })
		.send({ images: [{ dataURL: DataURL }] })
		.expect(200);
};

// export const userBlocksAnotherUser = async (userToBlock: TokenAndId, userThatBlocks: TokenAndId) => {
// 	await api
// 		.post(`/api/users/${userToBlock.id}/block`)
// 		.set({ Authorization: `bearer ${userThatBlocks.token}` })
// 		.expect(200);

// 	const blockStatusAtEnd = await checkBlockEntry(userToBlock.id, userThatBlocks.id);
// 	expect(blockStatusAtEnd).toBeTruthy();
// };
