import axios from 'axios';
import getAuthHeader from './auth';
import { AppError, handleAxiosError } from '../utils/errors';
import { apiBaseUrl } from '../constants';

const getMovie = async (movieId: string | undefined) => {
	if (!movieId) throw new AppError('alertMissingMovieId');

	try {
		const config = {
			headers: { Authorization: getAuthHeader() }
		};
		const response = await axios.get(
			`${apiBaseUrl}/movies/${movieId}`,
			config
		);
		return response.data;
	} catch (err) {
		handleAxiosError(err);
	}
};

const moduleExports = { getMovie };
export default moduleExports;
