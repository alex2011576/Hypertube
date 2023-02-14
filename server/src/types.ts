import { Request } from 'express';
import * as t from 'io-ts';

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
export type New42UserWithHashedPwd = BaseUser & { passwordHash: string; id42: number; activationCode: string; avatar: string | undefined | null };
export type UserGitHub = BaseUser & { idGitHub: number; avatar: string | undefined | null };
export type NewGHUserWithHashedPwd = BaseUser & { passwordHash: string; idGitHub: number; activationCode: string; avatar: string | undefined | null };

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

export type Session = NewSessionUser & { sessionId: string; expiresAt: Date };
export type AuthState = { state: string; createdAt: Date };

export interface CustomRequest extends Request {
	sessionId?: string;
	session?: Session;
}

export type NewPasswordResetRequest = { userId: string };

export type EmailUpdateRequest = { userId: string; email: string; token: string; expiresAt: Date };

export type PasswordResetRequest = NewPasswordResetRequest & { token: string; expiresAt: Date };

export type AuthType = '42' | 'github';

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
	// quality: string[];
};

export type OmdbMovieData = {
	director: string;
	writer: string;
	actors: string[];
	country: string;
	awards: string;
};

export type MovieData = {
	ytsMovieData: YtsMovieData;
	omdbMovieData: OmdbMovieData | undefined;
};
