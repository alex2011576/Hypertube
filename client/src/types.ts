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

export type NewUser = BaseUser & { passwordPlain: string };

export type LoggedUser = {
	id: string;
	token: string;
	username: string;
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
}


export enum LanguageOptions {
	ENGLISH = 'enUS',
	RUSSIAN = 'ruRU',
	SWEDISH = 'svSE'
}