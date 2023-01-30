import express from 'express';
import passport from 'passport';
import { addSession } from '../repositories/sessionRepository';
import { User } from '../types';
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

export default router;
