import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { handleAxiosError } from '../utils/errors';
import getAuthHeader from './auth';

const getInitialMovies = async (page: number, limit: number) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.get(
			`${apiBaseUrl}/library?page=${page}&limit=${limit}`,
			config
		);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const moduleExports = { getInitialMovies };
export default moduleExports;
