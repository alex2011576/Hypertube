import axios from 'axios';
import getAuthHeader from './auth';
import { handleAxiosError } from '../utils/errors';
import { apiBaseUrl } from '../constants';

const getMovieSubtitles = async (imdbId: string, defaultLanguage: string) => {
	try {
		const config = {
			headers: { Authorization: getAuthHeader() },
			params: { defaultLanguage }
		};
		const response = await axios.get(`${apiBaseUrl}/subtitles/${imdbId}`, config);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const moduleExports = { getMovieSubtitles };
export default moduleExports;
