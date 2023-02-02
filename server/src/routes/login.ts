import express from 'express';
import passport from 'passport';
import { addSession } from '../repositories/sessionRepository';
import { User } from '../types';
import asyncHandler from 'express-async-handler';
import { addState, isAuthState } from '../repositories/stateRepository';
import { Auth42 } from '../services/auth';

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

router.get(
	'/42',
	asyncHandler(async (_req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const stateEntry = await addState();
		console.log(`1st state: ${stateEntry.state}`);
		res.redirect(
			`https://api.intra.42.fr/oauth/authorize?client_id=${process.env.FORTYTWO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_FRONTEND_URL}/auth/42/callback&response_type=code&scope=public&state=${stateEntry.state}`
		);
	})
);

router.get(
	'/42/callback',
	asyncHandler(async (req, res) => {
		const state = req.query.state as string;
		const code = req.query.code as string;

		if (!(await isAuthState(state))) {
			res.status(401).send({ error: 'Foreign state in request query' });
			return;
		}

		const clientLogInToken = await Auth42(code);
		res.status(200).send(clientLogInToken);
		return;
	})
);

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

export default router;
