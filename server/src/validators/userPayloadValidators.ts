import { LanguageOption, NewUser, UserProfile } from '../types';
import { isLanguageOption, isString } from './basicTypeValidators';
import { ValidationError } from '../errors';
import { parseImage } from './imgValidators';

const usernameRegex = /^[a-zA-Z0-9_\-.ÄÖäöÅåßÜü]{4,21}$/;
const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,42})/;
const nameRegex = /^[a-zA-Z'\-ÄÖäöÅåßÜü\s]*$/;
// eslint-disable-next-line no-useless-escape
const tokenRegex = /[a-z0-9\-]{36}/;

export const parseUsername = (username: unknown): string => {
	if (!username || !isString(username)) {
		// throw new ValidationError(`Missing username / Expected username to be string, got: ${typeof username}`);
		throw new ValidationError('usernameNotString');
	}
	const trimmedUsername = username.trim();
	if (!trimmedUsername) {
		throw new ValidationError('usernameMissing');
	}
	if (trimmedUsername.length < 4) {
		throw new ValidationError('usernameTooShort');
	}
	if (trimmedUsername.length > 21) {
		throw new ValidationError('usernameTooLong');
	}
	if (!usernameRegex.test(trimmedUsername)) {
		throw new ValidationError('usernameInvalid');
	}
	return trimmedUsername;
};

export const parseEmail = (email: unknown): string => {
	if (!email || !isString(email)) {
		// throw new ValidationError(`Missing email / Expected email to be string, got: ${typeof email}`);
		throw new ValidationError('emailNotString');
	}
	const trimmedEmail = email.toLowerCase().trim();
	if (!trimmedEmail) {
		throw new ValidationError('emailMissing');
	}
	if (!emailRegex.test(trimmedEmail)) {
		throw new ValidationError('emailInvalid');
	}
	return trimmedEmail;
};

export const validatePassword = (passwordPlain: unknown): string => {
	if (!passwordPlain || !isString(passwordPlain)) {
		// throw new ValidationError(`Missing password / Expected password to be string, got: ${typeof passwordPlain}`);
		throw new ValidationError('passwordNotString');
	}
	if (passwordPlain.length < 8) {
		throw new ValidationError('passwordTooShort');
	}
	if (passwordPlain.length > 42) {
		throw new ValidationError('passwordTooLong');
	}
	if (!passwordRegex.test(passwordPlain)) {
		throw new ValidationError('passwordWeak');
	}
	return passwordPlain;
};

export const parseFirstname = (firstname: unknown): string => {
	if (!firstname || !isString(firstname)) {
		// throw new ValidationError(`Missing first name / Expected firstname to be string, got: ${typeof firstname}`);
		throw new ValidationError('firstnameNotString');
	}
	const trimmedFirstname = firstname.trim().replace(/\s\s+/g, ' ');
	if (!trimmedFirstname) {
		throw new ValidationError('firstnameMissing');
	}
	if (trimmedFirstname.length > 21) {
		throw new ValidationError('firstnameTooLong');
	}
	if (!nameRegex.test(trimmedFirstname)) {
		throw new ValidationError('firstnameInvalid');
	}
	return trimmedFirstname;
};

export const parseLastname = (lastname: unknown): string => {
	if (!lastname || !isString(lastname)) {
		// throw new ValidationError(`Missing last name / Expected lastname to be string, got: ${typeof lastname}`);
		throw new ValidationError('lastnameNotString');
	}
	const trimmedLastname = lastname.trim().replace(/\s\s+/g, ' ');
	if (!trimmedLastname) {
		throw new ValidationError('lastnameMissing');
	}
	if (trimmedLastname.length > 41) {
		throw new ValidationError('lastnameTooLong');
	}
	if (!nameRegex.test(trimmedLastname)) {
		throw new ValidationError('lastnameInvalid');
	}
	return trimmedLastname;
};

export const validateToken = (token: unknown): string => {
	if (!token || !isString(token)) {
		// throw new ValidationError(`Missing token or not string: ${typeof token}`);
		throw new ValidationError('tokenPasswordNotString');
	}
	const trimmedToken = token.trim();
	if (!trimmedToken) {
		throw new ValidationError('tokenPasswordMissing');
	}
	if (trimmedToken.length !== 36) {
		throw new ValidationError('tokenPasswordResetInvalid');
	}
	if (!tokenRegex.test(trimmedToken)) {
		throw new ValidationError('tokenPasswordResetInvalidFormat');
	}
	return trimmedToken;
};

export const validateEmailToken = (token: unknown): string => {
	if (!token || !isString(token)) {
		// throw new ValidationError(`Missing token or not string: ${typeof token}`);
		throw new ValidationError('tokenEmailNotString');
	}
	const trimmedToken = token.trim();
	if (!trimmedToken) {
		throw new ValidationError('tokenEmailMissing');
	}
	if (trimmedToken.length !== 36) {
		throw new ValidationError('tokenEmailInvalid');
	}
	if (!tokenRegex.test(trimmedToken)) {
		throw new ValidationError('tokenEmailInvalidFormat');
	}
	return trimmedToken;
};

type Fields = { username: unknown; email: unknown; passwordPlain: unknown; firstname: unknown; lastname: unknown; language: unknown };

export const parseNewUserPayload = ({ username, email, passwordPlain, firstname, lastname, language }: Fields): NewUser => {
	const newUser: NewUser = {
		username: parseUsername(username),
		email: parseEmail(email),
		passwordPlain: validatePassword(passwordPlain),
		firstname: parseFirstname(firstname),
		lastname: parseLastname(lastname),
		language: parseLanguageOption(language)
	};
	return newUser;
};

export const parseLanguageOption = (languageOption: unknown): LanguageOption => {
	if (isLanguageOption(languageOption)) return languageOption;
	return 'enUS';
};

type Fields1 = {
	username: unknown;
	firstname: unknown;
	lastname: unknown;
	language: unknown;
	photo: unknown;
};

export const parseUserProfilePayload = async ({ firstname, lastname, username, language, photo }: Fields1): Promise<UserProfile> => {
	const updatedUser: UserProfile = {
		username: parseUsername(username),
		firstname: parseFirstname(firstname),
		lastname: parseLastname(lastname),
		language: parseLanguageOption(language),
		photo: await parseImage(photo)
	};
	return updatedUser;
};
