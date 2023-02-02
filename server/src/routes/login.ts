import express from 'express';
import passport from 'passport';
import { addSession } from '../repositories/sessionRepository';
import { User } from '../types';
import asyncHandler from 'express-async-handler';
import axios from 'axios';
import { addState, isAuthState } from '../repositories/stateRepository';
import { deleteUserByEmail, findUserBy42id, findUserByEmail, findUserByUsername, setUser42id } from '../repositories/userRepository';
import generator from 'generate-password-ts';
import { createNew42User } from '../services/users';
const router = express.Router();

router.post('/', (req, res, next) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	passport.authenticate('local', { session: false }, (err, user: User, info) => {
		if (err) {
			console.log(err);
			return next(err.message as string);
		}
		if (info) {
			console.log(info);
			res.status(401).json({ error: info.message as string });
		}
		void addSession({ userId: user.id, username: user.username, email: user.email })
			.then((session) => res.status(200).send({ token: session.sessionId, username: user?.username, id: user?.id }))
			.catch((e) => {
				console.log(e);
				next(e);
			});
	})(req, res, next);
	// passport.authenticate('local', { session: false },
	// asyncHandler(async (req, res) => {
	// 	const user = req.user as User;
	// 	console.log(user);
	// 	const session = await addSession({ userId: user.id, username: user.username, email: user.email });
	// 	res.status(200).send({ token: session.sessionId, username: user?.username, id: user?.id});
	// })
});

// // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// router.get('/42', passport.authenticate('oauth2'));

// // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// router.get('/42/callback', passport.authenticate('oauth2', {
// 	session: false,
// 	successRedirect: '/',
// 	failureRedirect: '/login'
// }));

// router.get(
// 	'/42',
// 	asyncHandler(async (_req, res) => {
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// 		const fortytwo_response = await axios.post(`https://api.intra.42.fr/oauth/authorize`, {
// 			client_id: process.env.FORTYTWO_CLIENT_ID,
// 			client_secret: process.env.FORTYTWO_CLIENT_SECRET,
// 			code: 'code',
// 			redirect_uri: `${process.env.REACT_APP_BACKEND_URL}/api/login/42/callback`
// 		});
// 		// console.log(fortytwo_response);
// 		res.status(200).send(fortytwo_response.data);
// 	})
// );
router.get(
	'/42',
	asyncHandler(async (_req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const stateEntry = await addState();
		console.log(`1st state: ${stateEntry.state}`);
		res.redirect(`https://api.intra.42.fr/oauth/authorize?client_id=${process.env.FORTYTWO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_BACKEND_URL}/api/login/42/callback&response_type=code&scope=public&state=${stateEntry.state}`);
	})
);
router.get(
	'/42/callback',
	asyncHandler(async (req, res) => {
		const state = req.query.state as string;
		const code = req.query.code as string;
		console.log(code);
		console.log(state);	

		try { 
			const isState = await isAuthState(state);
			if (!isState) throw new Error();
		} catch (e) {
			res.status(401).send({ error: 'Foreign state in request query' });
		}
		
		const fortytwo_response = await axios.post(`https://api.intra.42.fr/oauth/token`, {
			grant_type: 'authorization_code',	
			client_id: process.env.FORTYTWO_CLIENT_ID,
			client_secret: process.env.FORTYTWO_CLIENT_SECRET,
			code: code,
			redirect_uri: `${process.env.REACT_APP_BACKEND_URL}/api/login/42/callback`
		});

		if (fortytwo_response.data.error) {
			console.log(fortytwo_response.data.error);
			const error_message = encodeURIComponent(fortytwo_response.data?.error_description as string || '42 login failed');
			// res.redirect(`http://localhost:3000/login?error=${error_message}`);
			res.status(400).json({error: `${error_message}`});
			return;
		}

		interface User42 {
			id: number;
			login: string;
			first_name: string;
			last_name: string;
			email: string;
		}

		const { data }: { data: User42} = await axios.get('https://api.intra.42.fr/v2/me', {
			headers: {
				Authorization: 'Bearer ' + fortytwo_response.data.access_token,
			},
		});

		const userData = {
			id42: data.id,
			username: data.login,
			firstname: data.first_name,
			lastname: data.last_name,
			email: data.email,
			passwordPlain: generator.generate({
				length: 10,
				numbers: true,
				symbols: true,
				strict: true	
			})
		};
		console.log(userData);
		
		const user = await findUserBy42id(userData.id42);
		if (user) {
			console.log('old user');
			const session = await addSession({ userId: user.id, username: user.username, email: user.email });
			res.status(200).send({ token: session.sessionId, username: user?.username, id: user?.id});
		}
		if (!user) {
			console.log('new user');
			let newUser: User;
			let oldUserSameUsername = await findUserByUsername(userData.username);
			if (oldUserSameUsername && oldUserSameUsername.email !== userData.email) {
				while (oldUserSameUsername) {
					userData.username +=
						String(
							Math.floor(
								Math.random() * (100000 - 111) + 111
							)
						);
					oldUserSameUsername = await findUserByUsername(userData.username);
				}
			}
			const oldUserSameEmail = await findUserByEmail(userData.email);
			if (!oldUserSameEmail || !oldUserSameEmail.isActive) {
					await deleteUserByEmail(userData.email);
					newUser = await createNew42User(userData);
			} else {
					await setUser42id(oldUserSameEmail.id, userData.id42);
					newUser = oldUserSameEmail;
			}
			const session = await addSession({ userId: newUser.id, username: newUser.username, email: newUser.email });
			res.status(200).send({ token: session.sessionId, username: newUser?.username, id: newUser?.id});
			return; 
		}
	})
);
export default router;

// authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
// tokenURL: 'https://api.intra.42.fr/oauth/token',
// clientID: 'u-s4t2ud-7fae5e311a1b4e19da2b63d3244a47e5b53ef4dae4b587eb6165f64cddcf653c',
// clientSecret: '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',
// callbackURL: "http://localhost:3001/api/login/42/callback"
