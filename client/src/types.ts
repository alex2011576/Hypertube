export type BaseUser = {
	username: string;
	email: string;
	firstname: string;
	lastname: string;
};

export type User = BaseUser & {
	id: string;
	passwordHash: string;
	created_at: Date;
};

export type NewUserWithHashedPwd = BaseUser & { passwordHash: string };

export type NewUser = BaseUser & { passwordPlain: string; language: LanguageOption };

export type LoggedUser = {
	id: string;
	token: string;
	username: string;
	language: LanguageOption;
};

export enum AlertStatus {
	None = 'NONE',
	Success = 'SUCCESS',
	Error = 'ERROR'
}

export type PhotoType = {
	imageDataUrl: string | undefined;
};

export type UserData = {
	username: string;
	firstname: string;
	lastname: string;
	language: string | undefined;
};

export type NewUserData = {
	username: string;
	firstname: string;
	lastname: string;
	language: string | undefined;
	photo: PhotoType | undefined;
};

export type LanguageOption = 'enUS' | 'ruRU' | 'svSE';

export type ProfilePublic = {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	language: LanguageOption;
};

export type Dictionary = {
	[key: string]: string;
};

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

export type SearchQuery = {
	queryTerm: string;
	genre: string;
	sortBy: string;
	reverseOrder: boolean;
};

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
	torrents: Torrent[];
};

export type Torrent = { quality: string; seeds: number; peers: number };

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
	translatedMovieData: MovieDataTranslations;
};

export type TranslatedFields = {
	title: string;
	country: string;
	genre: string;
	plot: string;
};

export type MovieDataTranslations = {
	en: TranslatedFields;
	ru: TranslatedFields;
	sv: TranslatedFields;
};

export type StreamStatus = {
	ready: boolean;
	progress: string;
	downloaded?: string;
	info?: string;
};

export type UserReview = {
	text: string;
	rating: number;
};

export type ReviewType = {
	text: string;
	rating: number;
	userId: string;
	username: string;
	photo?: string;
};

export type ReviewsAndTotalCount = {
	reviews: ReviewType[];
	totalCount: number;
};

export type SubtitleTrack = {
	kind: string;
	src: string;
	srcLang: string;
	label: string;
	default: boolean;
};
