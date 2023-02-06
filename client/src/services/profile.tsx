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
		const response = await axios.get(`${apiBaseUrl}/users/${userId}/profile`, config);
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
		const response = await axios.get(`${apiBaseUrl}/users/${userId}/photos`, config);
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
		const response = await axios.put(`${apiBaseUrl}/users/${userId}/profile`, { newUserData } , config);
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
		await axios.post(`${apiBaseUrl}/users/${userId}/photos`, images, config);
	} catch (err) {
		handleAxiosError(err);
	}
};



const moduleExports = { getProfile, getPhoto, updateProfile, uploadPhoto };
export default moduleExports;