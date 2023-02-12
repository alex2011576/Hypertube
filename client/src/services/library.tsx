import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { SearchQuery } from '../types';
import { handleAxiosError } from '../utils/errors';
import getAuthHeader from './auth';

const getInitialMovies = async (searchQuery: SearchQuery, page: number, limit: number) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.post(
			`${apiBaseUrl}/library`,
			{ ...searchQuery, page, limit },
			config
		);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const moduleExports = { getInitialMovies };
export default moduleExports;
