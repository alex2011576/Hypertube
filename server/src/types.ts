import { Request } from 'express';

export type BaseUser = {
	username: string;
	email: string;
	firstname: string;
	lastname: string;
};

export type UserCompletness = { complete: boolean };

export type NewUser = BaseUser & { passwordPlain: string };
export type NewUserWithHashedPwd = BaseUser & { passwordHash: string; activationCode: string;};

export type User42 = BaseUser & {id42: number; };
export type New42UserWithHashedPwd = BaseUser & { passwordHash: string; id42: number; activationCode: string; };
export type UserGitHub = BaseUser & {idGitHub: number; avatar: string | undefined | null;};
export type NewGHUserWithHashedPwd = BaseUser & { passwordHash: string; idGitHub: number; activationCode: string; };

export type LoggedUser = BaseUser & { id: string };

export type NewSessionUser = {
	userId: string;
	username: string;
	email: string;
};

export type User = BaseUser & {
	id: string;
	passwordHash: string;
	createdAt: Date;
	isActive: boolean;
	activationCode: string;
};

export interface UserData42 {
	id: number;
	login: string;
	first_name: string;
	last_name: string;
	email: string;
}
export interface UserDataGH {
	id: number;
	login: string;
	name: string;
	avatar_url: string | undefined | null;
}

export type Session = NewSessionUser & { sessionId: string; expiresAt: Date };
export type AuthState = {state: string; createdAt: Date};

export interface CustomRequest extends Request {
	sessionId?: string;
	session?: Session;
}

export type NewPasswordResetRequest = { userId: string };

export type EmailUpdateRequest = { userId: string; email: string; token: string; expiresAt: Date };

export type PasswordResetRequest = NewPasswordResetRequest & { token: string; expiresAt: Date };