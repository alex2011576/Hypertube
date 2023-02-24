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
			throw new AppError(`moviesUserNotLoggedIn`, 400);
		}
		const imdb = req.params.imdb;
		const quality = req.params.quality;
        if (!isIMDB(imdb)) throw new AppError(`streamingInvalidImdb`, 400);
        if (!isQuality(quality)) throw new AppError(`streamingInvalidQuality`, 400);

		const streamStatus = await getStreamStatus(imdb, quality);
		// console.log(streamStatus);
		console.log(`Stream is READY! Download progress is ${streamStatus.progress}%\n`);
		
        res.status(200).send(streamStatus);
		try {
			await updateWatchHistory(imdb, quality, req.session.userId);
		} catch {
			console.log('Attention! Failed to update watch history');
		}
		return ;
	})
);

router.get(
	'/:imdb/:quality',
	asyncHandler(async (req: CustomRequest, res) => {
		const imdb = req.params.imdb;
		const quality = req.params.quality;
        if (!isIMDB(imdb)) throw new AppError(`streamingInvalidImdb`, 400);
        if (!isQuality(quality)) throw new AppError(`streamingInvalidQuality`, 400);
		const range = req.headers.range;
		
		if (!range) {
			throw new AppError(`streamingRangeNotProvided`, 400);
			return ;
		}
		const streamRes = await streamContent(imdb, quality, range, req);
		if (!streamRes) return;
		// console.log(streamRes);
		if (streamRes.stream) {
			res.writeHead(streamRes.code, streamRes.headers);
			streamRes.stream.pipe(res);
		} else {
			console.log('Attention! Range not satisfiable');
			res.writeHead(streamRes.code, streamRes.headers).end();
			return;
		}
		return;
	})
);

export default router;
