import axios from 'axios';
import { IMDB, MovieData, MovieDataTranslations, OmdbMovieData, ReviewAndTotalCount, StreamQuality, TranslatedFields, YtsMovieData } from '../types';
import { getReviews, getTotalReviewsCount } from '../repositories/movieRepository';
import { getErrorMessage } from '../errors';
import { searchInDownloads } from '../repositories/downloadsRepository';
import { createWatchRecord, isWatchedByUser } from '../repositories/watchHistoryRepository';
import { googleTranslate } from './translate';

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
	background_image: string;
	torrents: { quality: string; seeds: number; peers: number }[];
};

const getYtsMovieData = async (userId: string, ytsMovieId: string): Promise<YtsMovieData | undefined> => {
	try {
		const ytsPayload = await axios.get<YTSPayload>(`https://yts.mx/api/v2/movie_details.json`, {
			params: { movie_id: ytsMovieId, with_images: 'true' }
		});

		const movie: YTSMoviePayload = ytsPayload.data.data.movie;
		const torrents = movie.torrents.map((torrent) => {
			return { seeds: torrent.seeds, peers: torrent.peers, quality: torrent.quality };
		});

		const ytsMovieData: YtsMovieData = {
			id: movie.id,
			imdbCode: movie.imdb_code || '',
			title: movie.title || '',
			year: movie.year || 0,
			summary: movie.summary || '',
			cover: movie.large_cover_image || '',
			rating: movie.rating || 0,
			isWatched: movie.imdb_code ? await isWatchedByUser(userId, movie.imdb_code as IMDB) : false,
			titleEnglish: movie.title_english || '',
			descriptionIntro: movie.description_intro || '',
			runtime: movie.runtime || 0,
			genres: movie.genres || [''],
			downloadCount: movie.download_count || 0,
			likeCount: movie.like_count || 0,
			language: movie.language || '',
			largeScreenshotImage: movie.large_screenshot_image1 || '',
			backgroundImage: movie.background_image || '',
			torrents
		};

		return ytsMovieData;
	} catch (err) {
		console.log('Failed to get response from YTS movie_details: ', getErrorMessage(err)); //rm later ? maybe not
	}
	return undefined;
};

type OmdbMoviePayload = {
	Plot: string;
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
			plot: movie.Plot || '',
			director: movie.Director || '',
			writer: movie.Writer || '',
			actors: movie.Actors || '',
			country: movie.Country || '',
			awards: movie.Awards || ''
		};

		return omdbMovieData;
	} catch (err) {
		console.log('Failed to get response from Omdb:', getErrorMessage(err)); //rm later ? maybe not
	}
	return undefined;
};

export const getMovieData = async (userId: string, ytsMovieId: string): Promise<MovieData | undefined> => {
	const ytsMovieData: YtsMovieData | undefined = await getYtsMovieData(userId, ytsMovieId);
	if (!ytsMovieData) return undefined;

	const imdbCodeRegex = /(?=^.{9,10}$)(^tt[\d]{7,8})$/;
	const imdbCode = ytsMovieData.imdbCode && imdbCodeRegex.test(ytsMovieData.imdbCode) ? ytsMovieData.imdbCode : undefined;

	const omdbMovieData = imdbCode ? await getOmdbMovieData(imdbCode) : undefined;

	const fieldsForTranslation: TranslatedFields = {
		title: ytsMovieData.title || 'No title',
		country: omdbMovieData?.country || 'No country',
		genre: ytsMovieData.genres[0] || 'No genre',
		plot: omdbMovieData?.plot || 'No plot'
	};

	const translatedMovieData = await getTranslations(fieldsForTranslation);
	return { ytsMovieData, omdbMovieData, translatedMovieData };
};

export const getTranslations = async (fieldsForTranslation: TranslatedFields): Promise<MovieDataTranslations> => {
	const text = Object.values(fieldsForTranslation).join(' !111! ');
	const translationRu = await googleTranslate(text, 'ru');
	const translationSv = await googleTranslate(text, 'sv');
	return { en: fieldsForTranslation, ru: createTranslatedObject(translationRu), sv: createTranslatedObject(translationSv) };
};

export const createTranslatedObject = (translation: string | undefined): TranslatedFields | undefined => {
	if (!translation) return undefined;
	const splitted = translation.split(' !111! ');
	return {
		title: splitted[0],
		country: splitted[1],
		genre: splitted[2],
		plot: splitted[3]
	};
};

export const getMovieReviews = async (ytsMovieId: string, page: string): Promise<ReviewAndTotalCount> => {
	const reviews = await getReviews(ytsMovieId, Number(page));
	const totalCount = await getTotalReviewsCount(ytsMovieId);
	return { reviews: reviews, totalCount: totalCount };
};

export const updateWatchHistory = async (imdb: IMDB, quality: StreamQuality, userId: string) => {
	const movie = await searchInDownloads(imdb, quality);
	if (movie && movie.id) {
		await createWatchRecord(userId, movie.id);
	}
};
