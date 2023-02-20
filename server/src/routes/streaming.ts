import express from 'express';
import asyncHandler from 'express-async-handler';
import { AppError } from '../errors';
import { getStreamStatus, streamContent } from '../services/streaming';
import { CustomRequest } from '../types';
import { sessionExtractor } from '../utils/middleware';
import { isIMDB, isQuality } from '../validators/basicTypeValidators';

const router = express.Router();

router.get(
	'/status/:imdb/:quality',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`User is not logged in!`, 400);
		}
		const imdb = req.params.imdb;
		const quality = req.params.quality;
		if (!isIMDB(imdb)) throw new AppError(`Invalid imdb id`, 400);
		if (!isQuality(quality)) throw new AppError(`Invalid quality parameter`, 400);

		const streamStatus = await getStreamStatus(imdb, quality);
		console.log(streamStatus);

		res.status(200).send(streamStatus);
	})
);

router.get(
	'/:imdb/:quality',
	// sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		// if (!req.session || !req.session.userId) {
		// 	throw new AppError(`User is not logged in!`, 400);
		// }
		const imdb = req.params.imdb;
		const quality = req.params.quality;
		if (!isIMDB(imdb)) throw new AppError(`Invalid imdb id`, 400);
		if (!isQuality(quality)) throw new AppError(`Invalid quality parameter`, 400);
		const range = req.headers.range;
		console.log(range);

		if (!range) {
			console.log('here');
			throw new AppError('Suck my balls', 404);
			res.status(404).send('Requires Range header');
			return;
		}
		const streamRes = await streamContent(imdb, quality, range);
		res.writeHead(streamRes.code, streamRes.headers);
		streamRes.stream.pipe(res);
	})
);

export default router;
