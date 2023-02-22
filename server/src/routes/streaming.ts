import express from 'express';
import asyncHandler from 'express-async-handler';
import { AppError } from '../errors';
import { updateWatchHistory } from '../services/movie';
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
		try {
			await updateWatchHistory(imdb, quality, req.session.userId);
		} catch {
			console.log('failed to update watch history');
		}
		return ;
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
		// console.log(range);
		
		if (!range) {
			console.log('here');
			res.status(400).send('Requires Range header');
			return ;
		}
		const streamRes = await streamContent(imdb, quality, range);
		// console.log(streamRes);
		if (streamRes.stream) {
			res.writeHead(streamRes.code, streamRes.headers);
			streamRes.stream.pipe(res);
		} else {
			console.log('Range not satisfiable.');
			res.writeHead(streamRes.code, streamRes.headers).end();
			return;
		}
		return;
	})
);

export default router;