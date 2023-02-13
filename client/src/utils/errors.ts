import axios from 'axios';

export class AppError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'AppError';
	}
}

export class AuthError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'AuthError';
	}
}

export const handleAxiosError = (err: unknown): never => {
	if (axios.isAxiosError(err)) {
		if (err.response) {
			if (err.response.status === 401) {
				throw new AuthError('authError');
			}
			if (err.response.data && err.response.data.error) {
				throw new AppError(err.response.data.error);
			}
		}
		if (err.code === 'ERR_NETWORK') {
			throw new AppError('axiosNetworkError');
		}
	}
	throw err;
};
