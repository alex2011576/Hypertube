import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { handleAxiosError } from '../utils/errors';
import getAuthHeader from './auth';

const getInitialMovies = async () => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.get(`${apiBaseUrl}/library`, config);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const moduleExports = { getInitialMovies };
export default moduleExports;
