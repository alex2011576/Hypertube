import express from 'express';
// import passport from 'passport';
import { addSession } from '../repositories/sessionRepository';
// import { User } from '../types';
import asyncHandler from 'express-async-handler';
import { addState, isAuthState } from '../repositories/stateRepository';
import { Auth42, AuthGitHub } from '../services/auth';
import { findUserByUsername } from '../repositories/userRepository';
import { parseUsername, validatePassword } from '../validators/userPayloadValidators';
import bcrypt from 'bcrypt';

const router = express.Router();

// router.post('/', (req, res, next) => {
// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// 	passport.authenticate('local', { session: false }, (err, user: User, info) => {
// 		if (err) {
// 			console.log(err);
// 			return next(err.message as string);
// 		}
// 		if (info) {
// 			console.log(info);
// 			return res.status(401).json({ error: info.message as string });
// 		}
// 		void addSession({ userId: user.id, username: user.username, email: user.email })
// 			.then((session) => res.status(200).send({ token: session.sessionId, username: user?.username, id: user?.id }))
// 			.catch((e) => {
// 				console.log(e);
// 				next(e);
// 			});
// 	})(req, res, next);
// });
router.post(
	'/',
	asyncHandler(async (req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { username, password } = req.body;

		const parsedUsername = parseUsername(username);
		const parsedPassword = validatePassword(password);

		const user = await findUserByUsername(parsedUsername);
		if (!user) {
			res.status(401).json({ error: 'User not found' });
			return;
		}

		const passwordCorrect = await bcrypt.compare(parsedPassword, user.passwordHash);
		if (!passwordCorrect) {
			res.status(401).json({ error: 'Wrong password' });
			return;
		}

		if (!user.isActive) {
			res.status(401).json({ error: 'Account is not active' });
			return;
		}

		// if (user.reportsCount > 10) {
		// 	res.status(401).json({ error: 'Account is blocked due to too many reports. We are sorry.' });
		// 	return;
		// }

		const session = await addSession({ userId: user.id, username: user.username, email: user.email });
		res.status(200).send({ token: session.sessionId, username: user?.username, id: user?.id });
	})
);


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
router.get(
	'/github',
	asyncHandler(async (_req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const stateEntry = await addState();
		res.redirect(
			`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_FRONTEND_URL}/auth/github/callback&response_type=code&scope=user&state=${stateEntry.state}`
		);
	})
);

router.get(
	'/github/callback',
	asyncHandler(async (req, res) => {
		const state = req.query.state as string;
		const code = req.query.code as string;

		if (!(await isAuthState(state))) {
			res.status(401).send({ error: 'Foreign state in request query' });
			return;
		}

		const clientLogInToken = await AuthGitHub(code);
		res.status(200).send(clientLogInToken);
		return;
	})
);

export default router;
