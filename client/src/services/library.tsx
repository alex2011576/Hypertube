import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Query } from '../types';
import { handleAxiosError } from '../utils/errors';
import getAuthHeader from './auth';

const getInitialMovies = async (query: Query, page: number, limit: number) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.post(
			`${apiBaseUrl}/library`,
			{ ...query, page, limit},
			config
		);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const moduleExports = { getInitialMovies };
export default moduleExports;
