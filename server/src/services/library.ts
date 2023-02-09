import { MovieThumbnail } from '../types';
import axios from 'axios';

type YTSPayload = {
	data: YTSPayloadData;
};

type YTSPayloadData = {
	movies: YTSMovie[];
};

type YTSMovie = {
	id: number;
	imdb_code: string;
	title: string;
	year: number;
	summary: string;
	large_cover_image: string;
	rating: number;
};

export const getInitialMovies = async (): Promise<MovieThumbnail[]> => {
	try {
		const response = await axios.get<YTSPayload>(`https://yts.torrentbay.to/api/v2/list_movies.json?sort_by=download_count&order_by=desc`);
		const movies = response.data.data.movies;
		const movieThumbnails: MovieThumbnail[] = movies.map((movie: YTSMovie) => {
			return {
				id: movie.id,
				imdbCode: movie.imdb_code,
				title: movie.title,
				year: movie.year,
				summary: movie.summary,
				cover: movie.large_cover_image,
				rating: movie.rating
			};
		});
		return movieThumbnails;
	} catch (err) {
		console.log('Response err: ', err);
	}
	return [];
};
