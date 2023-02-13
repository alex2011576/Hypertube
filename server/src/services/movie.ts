import { YtsMovieData } from '../types';
import axios from 'axios';

type YTSPayload = {
	data: YTSPayloadData;
};

type YTSPayloadData = {
	movie: YTSMovie;
};

type YTSMovie = {
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

export const getMovie = async (_userId: string, ytsMovieId: string): Promise<YtsMovieData | undefined> => {
	try {
		const ytsPayload = await axios.get<YTSPayload>(`https://yts.torrentbay.to/api/v2/movie_details.json`, {
			params: { movie_id: ytsMovieId, with_images: 'true', with_cast: 'true' }
		});

		const movie: YTSMovie = ytsPayload.data.data.movie;
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
		console.log('Response err: ', err); //rm later
	}
	return undefined;
};
