import { SearchQuery, MovieThumbnail, NewReviewType, GetReviewsData, ReviewAndTotalCount } from '../types';
import { getReviews, addReview } from '../repositories/movieRepository';
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



const getOrder = (sortBy: string, reverseOrder: boolean): string => {
	if (sortBy === 'Title') return reverseOrder ? 'desc' : 'asc';
	else return reverseOrder ? 'asc' : 'desc';
};

export const getMovies = async (searchQuery: SearchQuery): Promise<MovieThumbnail[]> => {
	try {
		const { queryTerm, genre, sortBy, reverseOrder, page, limit } = searchQuery;
		const sortCriteria = sortBy === 'Downloads' ? 'download_count' : sortBy.toLowerCase();
		const order = getOrder(sortBy, reverseOrder);

		const response = await axios.get<YTSPayload>(`https://yts.torrentbay.to/api/v2/list_movies.json`, {
			params: { page: page, limit: limit, query_term: queryTerm, genre: genre, sort_by: sortCriteria, order_by: order }
		});

		const movies = response.data.data.movies;
		const movieThumbnails: MovieThumbnail[] = movies
			? movies.map((movie: YTSMovie) => {
					return {
						id: movie.id,
						imdbCode: movie.imdb_code || '',
						title: movie.title || '',
						year: movie.year || 0,
						summary: movie.summary || '',
						cover: movie.large_cover_image || '',
						rating: movie.rating || 0,
						isWatched: false // <= function to check if watched here
					};
			})
			: [];
		return movieThumbnails;
	} catch (err) {
		console.log('Response err: ', err); //rm later
	}
	return [];
};

export const getMovieReviews = async (data: GetReviewsData): Promise<ReviewAndTotalCount | undefined> => {
	return(await getReviews(data));
};

export const addMovieReview = async (data: NewReviewType) => {
	await addReview(data);
};
