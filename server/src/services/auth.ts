import axios from 'axios';
import { AuthError, getErrorMessage } from '../errors';
import { AuthType, Session, User42, UserData42, UserDataGH, UserGitHub } from '../types';
import { deleteUserByEmail, findUserBy42id, findUserByEmail, findUserByGHid, setUser42id, setUserGHid } from '../repositories/userRepository';
import { addSession } from '../repositories/sessionRepository';
import { createNew42User, createNewGHUser } from './users';
import { adjustUsername, imgUrlToBase64 } from '../utils/helpers';

export const requestAuthToken = async (
	code: string,
	requestURI: string,
	redirecURI: string,
	clientId: string,
	clientSecret: string,
	authType: AuthType
): Promise<string> => {
	try {
		let TokenResponse;

		switch (authType) {
			case '42': {
				TokenResponse = await axios.post(`${requestURI}`, {
					grant_type: 'authorization_code',
					client_id: clientId,
					client_secret: clientSecret,
					code: code,
					redirect_uri: `${redirecURI}`
				});
				break;
			}
			case 'github': {
				TokenResponse = await axios({
					method: 'POST',
					url: `${requestURI}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
					headers: { Accept: 'application/json' }
				});
				break;
			}
		}
		if (TokenResponse.data.error || !TokenResponse.data.access_token) {
			console.log(TokenResponse.data.error);
			throw new AuthError(`${(TokenResponse.data?.error_description as string) || '42 login failed'}`);
		}
		return TokenResponse.data.access_token as string;
	} catch (e) {
		console.log('axios catch\n');
		console.log(e);
		throw new AuthError(`${getErrorMessage(e)}`);
	}
};

export const Auth42 = async (code: string) => {
	const redirectURI = `${process.env.REACT_APP_FRONTEND_URL}/auth/42/callback`;
	const requestURI = `https://api.intra.42.fr/oauth/token`;
	const clientId = process.env.FORTYTWO_CLIENT_ID as string;
	const clientSecret = process.env.FORTYTWO_CLIENT_SECRET as string;

	const accessToken = await requestAuthToken(code, requestURI, redirectURI, clientId, clientSecret, '42');

	const { data }: { data: UserData42 } = await axios.get('https://api.intra.42.fr/v2/me', {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	const user42: User42 = {
		id42: data.id,
		username: data.login,
		firstname: data.first_name,
		lastname: data.last_name,
		email: data.email,
		avatar: await imgUrlToBase64(data.image.link)
	};

	const session = await logIn42(user42);
	return { token: session.sessionId, username: session.username, id: session.userId, language: session.language };
};

export const logIn42 = async (user42: User42): Promise<Session> => {
	let user = await findUserBy42id(user42.id42);
	if (!user) {
		await adjustUsername(user42);
		const oldUserSameEmail = await findUserByEmail(user42.email);
		if (!oldUserSameEmail || !oldUserSameEmail.isActive) {
			await deleteUserByEmail(user42.email);
			user = await createNew42User(user42);
		} else {
			await setUser42id(oldUserSameEmail.id, user42.id42);
			user = oldUserSameEmail;
		}
	}
	const session = await addSession({ userId: user.id, username: user.username, email: user.email, language: user.language });
	return session;
};

export const AuthGitHub = async (code: string) => {
	const redirectURI = `${process.env.REACT_APP_FRONTEND_URL}/auth/github/callback`;
	const requestURI = `https://github.com/login/oauth/access_token`;
	const clientId = process.env.GITHUB_CLIENT_ID as string;
	const clientSecret = process.env.GITHUB_CLIENT_SECRET as string;

	const accessToken = await requestAuthToken(code, requestURI, redirectURI, clientId, clientSecret, 'github');

	const { data: userData }: { data: UserDataGH } = await axios.get('https://api.github.com/user', {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	const { data: emails }: { data: { email: string }[] } = await axios.get('https://api.github.com/user/emails', {
		headers: {
			Authorization: 'Bearer ' + accessToken
		}
	});

	const userGH: UserGitHub = {
		idGitHub: userData.id,
		username: userData.login,
		firstname: userData.name.split(' ')[0],
		lastname: userData.name.split(' ')[1],
		email: emails[0].email,
		avatar: await imgUrlToBase64(userData.avatar_url)
	};

	const session = await logInGitHub(userGH);
	return { token: session.sessionId, username: session.username, id: session.userId, language: session.language };
};

export const logInGitHub = async (userGH: UserGitHub): Promise<Session> => {
	let user = await findUserByGHid(userGH.idGitHub);
	if (!user) {
		await adjustUsername(userGH);
		const oldUserSameEmail = await findUserByEmail(userGH.email);
		if (!oldUserSameEmail || !oldUserSameEmail.isActive) {
			await deleteUserByEmail(userGH.email);
			user = await createNewGHUser(userGH);
		} else {
			await setUserGHid(oldUserSameEmail.id, userGH.idGitHub);
			user = oldUserSameEmail;
		}
	}
    console.log(user);
	const session = await addSession({ userId: user.id, username: user.username, email: user.email, language: user.language});
	return session;
};
