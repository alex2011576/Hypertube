import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { handleAxiosError } from '../utils/errors';
import getAuthHeader from './auth';

const getInitialMovies = async (queryTerm: string, page: number, limit: number) => {
	try {
		const queryTermParameter = queryTerm.length ? `queryTerm=${queryTerm}&` : '';
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.get(
			`${apiBaseUrl}/library?${queryTermParameter}page=${page}&limit=${limit}`,
			config
		);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const moduleExports = { getInitialMovies };
export default moduleExports;
