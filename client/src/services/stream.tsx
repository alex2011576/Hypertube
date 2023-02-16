import axios from 'axios';
import getAuthHeader from './auth';
import { handleAxiosError } from '../utils/errors';
import { apiBaseUrl } from '../constants';

// const getMovieStream = async (imdb: string, quality: string) => {
	
// 	try {
// 		const config = {
// 			headers: { Authorization: getAuthHeader() }
// 		};
// 		const response = await axios.get(
// 			`${apiBaseUrl}/stream/${imdb}/${quality}`,
// 			config
// 		);
// 		return response.data;
// 	} catch (err) {
// 		handleAxiosError(err);
// 	}
// };

const getMovieStatus = async (imdb: string, quality: string) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.get(
			`${apiBaseUrl}/stream/status/${imdb}/${quality}`,
			config
		);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const moduleExports = { getMovieStatus };
export default moduleExports;