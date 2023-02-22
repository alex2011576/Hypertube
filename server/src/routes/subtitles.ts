import express from 'express';
import asyncHandler from 'express-async-handler';
import { CustomRequest } from '../types';
import { isIMDB } from '../validators/basicTypeValidators';
import { AppError } from '../errors';
import { sessionExtractor } from '../utils/middleware';
import { downloadMovieSubtitles, getSubtitleTracks } from '../services/subtitles';
import fs = require('fs');

const router = express.Router();

router.get('/:id/:language', (req, res) => {
	const languages = ['en', 'ru', 'sv'];
	const imdbId = req.params.id;

	if (!isIMDB(imdbId)) {
		throw new AppError(`invalidImdbId`, 400); //translation
	}
	console.log(imdbId);
	const language = req.params.language;

	if (!language || !language.length || !languages.includes(language)) throw new AppError(`wrongLanguage`, 400); //translation

	const file = `./subtitles/${imdbId}/${imdbId}-${language}.vtt`;
	fs.readFile(file, (err, data) => {
		if (err) {
			throw new AppError(`noSubtitlesFile`, 400); //translation
		}
		res.set('Content-Type', 'text/plain');
		res.status(200).send(data);
	});
});

router.get(
	'/:id',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`moviesUserNotLoggedIn`, 400);
		}
		const imdbId = req.params.id;
		if (!isIMDB(imdbId)) {
			throw new AppError(`invalidImdbId`, 400); //translation
		}
		if (!(await downloadMovieSubtitles(imdbId))) {
			throw new AppError(`noSubtitles`, 400); //translation
		}
		const subtitlesTracks = await getSubtitleTracks(imdbId);
		res.status(200).send(subtitlesTracks);
	})
);

export default router;
