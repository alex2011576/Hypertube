import axios from 'axios';
import { apiBaseUrl } from '../constants';
import getAuthHeader from './auth';
import { handleAxiosError } from '../utils/errors';
import { NewUserData, PhotoType } from '../types';

export const getProfile = async (userId: string) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.get(`${apiBaseUrl}/profile/${userId}`, config);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

export const getPhoto = async (userId: string) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.get(`${apiBaseUrl}/profile/${userId}/photo`, config);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const updateProfile = async (userId: string, newUserData: NewUserData ) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.put(`${apiBaseUrl}/profile/${userId}`, newUserData , config);
		// Update User? or just return response.data?
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}

};

const uploadPhoto = async (userId: string, images: PhotoType | undefined) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		await axios.post(`${apiBaseUrl}/profile/${userId}/photo`, images, config);
	} catch (err) {
		handleAxiosError(err);
	}
};

const requestUpdateEmail = async ({ userId, email }: { userId: string; email: string }) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		await axios.post(`${apiBaseUrl}/profile/${userId}/update_email`, { email }, config);
	} catch (err) {
		handleAxiosError(err);
	}
};

const updatePassword = async ({
	userId,
	oldPassword,
	password
}: {
	userId: string;
	oldPassword: string;
	password: string;
}): Promise<void> => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		await axios.put(
			`${apiBaseUrl}/profile/${userId}/password/`,
			{ oldPassword, password },
			config
		);
	} catch (err) {
		handleAxiosError(err);
	}
};



const moduleExports = { getProfile, getPhoto, updateProfile, uploadPhoto, requestUpdateEmail, updatePassword };
export default moduleExports;