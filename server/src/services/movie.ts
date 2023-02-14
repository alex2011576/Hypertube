import { MovieData, OmdbMovieData, YtsMovieData } from '../types';
import axios from 'axios';

type YTSPayload = {
	data: YTSPayloadData;
};

type YTSPayloadData = {
	movie: YTSMoviePayload;
};

type YTSMoviePayload = {
	id: number;
	imdb_code: string;
	title: string;
	year: number;
	summary: string;
	large_cover_image: string;
	rating: number;
	title_english: string;
	description_intro: string;
	runtime: number;
	genres: string[];
	download_count: number;
	like_count: number;
	language: string;
	large_screenshot_image1: string;
	// quality: string[];
};

const getYtsMovieData = async (_userId: string, ytsMovieId: string): Promise<YtsMovieData | undefined> => {
	try {
		const ytsPayload = await axios.get<YTSPayload>(`https://yts.torrentbay.to/api/v2/movie_details.json`, {
			params: { movie_id: ytsMovieId, with_images: 'true', with_cast: 'true' }
		});

		const movie: YTSMoviePayload = ytsPayload.data.data.movie;
		const ytsMovieData: YtsMovieData = {
			id: movie.id,
			imdbCode: movie.imdb_code || '',
			title: movie.title || '',
			year: movie.year || 0,
			summary: movie.summary || '',
			cover: movie.large_cover_image || '',
			rating: movie.rating || 0,
			isWatched: false, // <= function to check if watched here, like: isMovieWatched(userId, movieId);
			titleEnglish: movie.title_english || '',
			descriptionIntro: movie.description_intro || '',
			runtime: movie.runtime || 0,
			genres: movie.genres || [''],
			downloadCount: movie.download_count || 0,
			likeCount: movie.like_count || 0,
			language: movie.language || '',
			largeScreenshotImage: movie.large_screenshot_image1 || ''
		};

		return ytsMovieData;
	} catch (err) {
		console.log('Failed to get response from YTS movie_details: ', err); //rm later
	}
	return undefined;
};

type OmdbMoviePayload = {
	Director: string;
	Writer: string;
	Actors: string;
	Country: string;
	Awards: string;
};

const getOmdbMovieData = async (imdbCode: string): Promise<OmdbMovieData | undefined> => {
	const { OMDB_KEY } = process.env;

	try {
		const omdbPayload = await axios.get<OmdbMoviePayload>(`http://www.omdbapi.com/`, { params: { apikey: OMDB_KEY, i: imdbCode } });

		const movie: OmdbMoviePayload = omdbPayload.data;
		const omdbMovieData: OmdbMovieData = {
			director: movie.Director || '',
			writer: movie.Writer || '',
			actors: movie.Actors.split(', ') || [''],
			country: movie.Country || '',
			awards: movie.Awards || ''
		};

		return omdbMovieData;
	} catch (err) {
		console.log('Failed to get response from Omdb');
	}
	return undefined;
};

export const getMovieData = async (userId: string, ytsMovieId: string): Promise<MovieData | undefined> => {
	const ytsMovieData: YtsMovieData | undefined = await getYtsMovieData(userId, ytsMovieId);
	if (!ytsMovieData) return undefined;

	const imdbCodeRegex = /(?=^.{9,10}$)(^tt[\d]{7,8})$/;
	const imdbCode = ytsMovieData.imdbCode && imdbCodeRegex.test(ytsMovieData.imdbCode) ? ytsMovieData.imdbCode : undefined;

	const omdbMovieData = imdbCode ? await getOmdbMovieData(imdbCode) : undefined;

	return { ytsMovieData, omdbMovieData };
};
