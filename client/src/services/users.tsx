import axios from 'axios';
import getAuthHeader from './auth';
import { apiBaseUrl } from '../constants';
import { NewUser } from '../types';

const create = async (newObject: NewUser): Promise<any> => {
	const response = await axios.post(`${apiBaseUrl}/users`, newObject);
	return response.data;
};

const activate = async (activationCode: string): Promise<void> => {
	await axios.post(`${apiBaseUrl}/users/activate/${activationCode}`);
};

const requestPasswordReset = async (email: string): Promise<void> => {
	await axios.post(`${apiBaseUrl}/users/forgot_password`, { email: email });
};

const checkResetToken = async (resetToken: string): Promise<void> => {
	await axios.get(`${apiBaseUrl}/users/forgot_password/${resetToken}`);
};

const resetPassword = async (token: string, passwordPlain: string): Promise<void> => {
	await axios.post(`${apiBaseUrl}/users/forgot_password/${token}`, {
		password: passwordPlain
	});
};

const setPassword = async (passwordPlain: string, confirmPasswordPlain: string, userId: string): Promise<void> => {
	const config = {
		headers: { Authorization: getAuthHeader() }
	};
	await axios.put(`${apiBaseUrl}/users/${userId}/set_password`,
		{
			password: passwordPlain,
			confirmPassword: confirmPasswordPlain
		}, 
		config
	);
};

const moduleExports = {
	create,
	activate,
	requestPasswordReset,
	checkResetToken,
	resetPassword,
	setPassword
};

export default moduleExports;
