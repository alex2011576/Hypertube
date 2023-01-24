import { Request } from 'express';

export type BaseUser = {
	username: string;
	email: string;
	firstname: string;
	lastname: string;
};

export type UserCompletness = { complete: boolean };

export type NewUserWithHashedPwd = BaseUser & { passwordHash: string; activationCode: string;};

export type LoggedUser = BaseUser & { id: string };

export type NewUser = BaseUser & { passwordPlain: string };

export type NewSessionUser = {
	userId: string;
	username: string;
	email: string;
};

export type Session = NewSessionUser & { sessionId: string; expiresAt: Date };

export interface CustomRequest extends Request {
	sessionId?: string;
	session?: Session;
}

export type NewPasswordResetRequest = { userId: string };

export type EmailUpdateRequest = { userId: string; email: string; token: string; expiresAt: Date };

export type PasswordResetRequest = NewPasswordResetRequest & { token: string; expiresAt: Date };