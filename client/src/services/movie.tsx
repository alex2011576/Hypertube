import axios from 'axios';
import getAuthHeader from './auth';
import { handleAxiosError } from '../utils/errors';
import { apiBaseUrl } from '../constants';
import { UserReview } from '../types';

const getMovie = async (movieId: string) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.get(`${apiBaseUrl}/movies/${movieId}`, config);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const getReviews = async (movieId: number, page: number) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() },
			params: { page }
		};
		const response = await axios.get(`${apiBaseUrl}/movies/${movieId}/reviews`, config);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const review = async (movieId: number, review: UserReview) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.post(`${apiBaseUrl}/movies/${movieId}/reviews`, config);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};
const moduleExports = { getMovie, getReviews, review };
export default moduleExports;
