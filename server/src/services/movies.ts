import axios from 'axios';
import fs from 'fs';
import { monthIdleMovies, removeDownloadRecord } from '../repositories/downloadsRepository';
import { SearchQuery, MovieThumbnail, IMDB } from '../types';
import { isWatchedByUser } from '../repositories/watchHistoryRepository';
import { checkMovieCover } from '../validators/imgValidators';

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
	if (sortBy === 'title') return reverseOrder ? 'desc' : 'asc';
	else return reverseOrder ? 'asc' : 'desc';
};

export const getMovies = async (searchQuery: SearchQuery, userId: string): Promise<MovieThumbnail[]> => {
	try {
		const { queryTerm, genre, sortBy, reverseOrder, page, limit } = searchQuery;
		const order = getOrder(sortBy, reverseOrder);

		const response = await axios.get<YTSPayload>(`https://yts.mx/api/v2/list_movies.json`, {
			params: { page: page, limit: limit, query_term: queryTerm, genre: genre, sort_by: sortBy, order_by: order }
		});

		const movies = response.data.data.movies;
		const movieThumbnails: MovieThumbnail[] = movies
			? await Promise.all(
					movies.map(async (movie: YTSMovie) => {
						return {
							id: movie.id,
							imdbCode: movie.imdb_code || '',
							title: movie.title || '',
							year: movie.year || 0,
							summary: movie.summary || '',
							cover: await checkMovieCover(movie.large_cover_image),
							rating: movie.rating || 0,
							isWatched: movie.imdb_code ? await isWatchedByUser(userId, movie.imdb_code as IMDB) : false
						};
					})
			)
			: [];
		return movieThumbnails;
	} catch (err) {
		void err;
		// console.log('Response err: ', err); //rm later
	}
	return [];
};

export const deleteIdleMovies = async (): Promise<void> => {
	const idleMovies = await monthIdleMovies();
	const noOfItems = idleMovies.length;
	const promises = [];
	console.log(`Cron task found ${noOfItems} idle movies`, noOfItems);

	try {
		for (let i = 0; i < noOfItems; i++) {
			const deletionPromise = removeDownloadRecord(idleMovies[i].id as string);
			promises.push(deletionPromise);
			const directory = idleMovies[i].path.split('/')[0];
			fs.rmSync(`movies/${directory}`, { recursive: true, force: true });
		}
		await Promise.all(promises);
	} catch {
		console.log('Deletion of idle movies failed');
	}
};
