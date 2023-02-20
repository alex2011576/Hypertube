import { Request } from 'express';
import * as t from 'io-ts';
import fs from 'fs';

export type BaseUser = {
	username: string;
	email: string;
	firstname: string;
	lastname: string;
};

export type UserCompleteness = { complete: boolean };

export type NewUser = BaseUser & { passwordPlain: string; language: LanguageOption };
export type NewUserWithHashedPwd = BaseUser & { passwordHash: string; activationCode: string; language: LanguageOption };

export type User42 = BaseUser & { id42: number; avatar: string | undefined };
export type New42User = BaseUser & { id42: number; activationCode: string; avatar: string | undefined | null };
export type UserGitHub = BaseUser & { idGitHub: number; avatar: string | undefined | null };
export type NewGHUser = BaseUser & { idGitHub: number; activationCode: string; avatar: string | undefined | null };

export type LoggedUser = BaseUser & { id: string };

export type NewSessionUser = {
	userId: string;
	username: string;
	email: string;
	language: string;
};

export type User = BaseUser & {
	id: string;
	passwordHash: string;
	createdAt: Date;
	isActive: boolean;
	activationCode: string;
	language: string;
};

export interface UserData {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	language: string;
}

export interface UserData42 {
	id: number;
	login: string;
	first_name: string;
	last_name: string;
	email: string;
	image: { link: string | undefined };
}

export interface UserDataGH {
	id: number;
	login: string;
	name: string;
	avatar_url: string | undefined | null;
}

export type UserProfile = {
	username: string;
	firstname: string;
	lastname: string;
	language: string;
	photo: PhotoType | undefined;
};

// export type UpdateUserProfile = {
// 	username: string;
// 	firstname: string;
// 	lastname: string;
// 	language: string;
// };

export type PhotoType = {
	imageDataUrl: string | undefined;
};

export type Photo = {
	imageType: string;
	dataBase64: string;
};
export type LanguageOption = 'enUS' | 'ruRU' | 'svSE';

export type PasswordSet = { isPasswordSet?: boolean };
export type Session = NewSessionUser & { sessionId: string; expiresAt: Date } & PasswordSet;
export type AuthState = { state: string; createdAt: Date };

export interface CustomRequest extends Request {
	sessionId?: string;
	session?: Session;
}

export type NewPasswordResetRequest = { userId: string };

export type EmailUpdateRequest = { userId: string; email: string; token: string; expiresAt: Date };

export type PasswordResetRequest = NewPasswordResetRequest & { token: string; expiresAt: Date };

export type AuthType = '42' | 'github';

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type IMDB = `tt${number}`;

export type FileInfo = {
	id?: string;
	path: string;
	type: string;
	size: number;
	completed?: boolean;
	imdb: IMDB;
	quality: StreamQuality;
	downloadTime?: Date;
};

type Torrent = { [key: string]: string | number } & { hash: string };

export type MyMovieDetails = { [key: string]: string | number };

export type YtsMovieDetailsJson = {
	data: {
		movie: MyMovieDetails & { torrents: Torrent[]; title_long: string };
	};
};

export type StreamQuality = '720p' | '1080p' | '3D';

export type MovieThumbnail = {
	id: number;
	imdbCode: string;
	title: string;
	year: number;
	summary: string;
	cover: string;
	rating: number;
	isWatched: boolean;
};

export const SearchQuerySchema = t.type({
	queryTerm: t.string,
	genre: t.string,
	sortBy: t.string,
	reverseOrder: t.boolean,
	page: t.number,
	limit: t.number
});

export type SearchQuery = t.TypeOf<typeof SearchQuerySchema>;

export type YtsMovieData = MovieThumbnail & {
	titleEnglish: string;
	descriptionIntro: string;
	runtime: number;
	genres: string[];
	downloadCount: number;
	likeCount: number;
	language: string;
	largeScreenshotImage: string;
	backgroundImage: string;
	torrents: { quality: string; seeds: number; peers: number }[];

	// quality: string[];
};

export type OmdbMovieData = {
	plot: string;
	director: string;
	writer: string;
	actors: string;
	country: string;
	awards: string;
};

export type MovieData = {
	ytsMovieData: YtsMovieData;
	omdbMovieData: OmdbMovieData | undefined;
};

export type StreamContent = {
	code: number;
	headers: { [key: string]: string | number };
	stream: fs.ReadStream;
};

export type StreamStatus = {
	ready: boolean;
	progress: string;
	downloaded?: string;
	info?: string;
};

export type ReviewType = {
	text: string;
	rating: number;
	userId: string;
	username: string;
	photo: string | undefined;
};

export type ReviewAndTotalCount = {
	reviews: ReviewType[] | undefined;
	totalCount: number;
};

export type GetReviewsData = {
	ytsMovieId: string;
	page: number;
};

export type NewReviewType = {
	text: string;
	rating: number;
	userId: string;
	ytsId: string;
};