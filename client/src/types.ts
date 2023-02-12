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
};

export type Query = {
	queryTerm: string;
	genre: string;
	sortBy: string;
	reverseOrder: boolean;
};
