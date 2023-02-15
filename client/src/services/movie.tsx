import axios from 'axios';
import getAuthHeader from './auth';
import { handleAxiosError } from '../utils/errors';
import { apiBaseUrl } from '../constants';
import { SearchQuery } from '../types';

const getMovies = async (searchQuery: SearchQuery, page: number, limit: number) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		// const response = await axios.post(
		// 	// `${apiBaseUrl}/movies/${id}`,
		// 	// { ...searchQuery, page, limit },
		// 	// config
		// );
		// return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const moduleExports = { getMovies };
export default moduleExports;
