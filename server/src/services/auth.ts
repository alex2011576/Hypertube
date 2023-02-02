import axios from 'axios';
import { AuthError, getErrorMessage } from '../errors';
import { Session, User42, UserData42 } from '../types';
import { deleteUserByEmail, findUserBy42id, findUserByEmail, setUser42id } from '../repositories/userRepository';
import { addSession } from '../repositories/sessionRepository';
import { createNew42User } from './users';
import { adjustUsername } from '../utils/helpers';

export const requestAuthToken = async (code: string, requestURI: string, redirecURI: string): Promise<string> => {
			
	try {
		const TokenResponse = await axios.post(`${requestURI}`, {
			grant_type: 'authorization_code',	
			client_id: process.env.FORTYTWO_CLIENT_ID,
			client_secret: process.env.FORTYTWO_CLIENT_SECRET,
			code: code,
			redirect_uri: `${redirecURI}`
		});
		if (TokenResponse.data.error || !TokenResponse.data.access_token) {
			console.log(TokenResponse.data.error);
			throw new AuthError(`${TokenResponse.data?.error_description as string || '42 login failed'}`);
		}
		return TokenResponse.data.access_token as string;
	} catch(e){
        throw new AuthError(`${getErrorMessage(e)}`);
	}	
};

export const Auth42 = async (code: string) => {
    const redirectURI = `${process.env.REACT_APP_BACKEND_URL}/api/login/42/callback`;
	const requestURI = `https://api.intra.42.fr/oauth/token`;

    const accessToken = await requestAuthToken(code, requestURI, redirectURI);

    const { data }: { data: UserData42} = await axios.get('https://api.intra.42.fr/v2/me', {
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
    });

    const user42: User42 = {
        id42: data.id,
        username: data.login,
        firstname: data.first_name,
        lastname: data.last_name,
        email: data.email,
    };

    const session = await logIn42(user42);
    return { token: session.sessionId, username: session.username, id: session.userId};
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
    const session = await addSession({ userId: user.id, username: user.username, email: user.email });
    return session;
};