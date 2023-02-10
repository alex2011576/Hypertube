import express from 'express';
import asyncHandler from 'express-async-handler';
import { AppError, ValidationError } from '../errors';
import { getInitialMovies } from '../services/library';
import { CustomRequest } from '../types';
import { sessionExtractor } from '../utils/middleware';
import { isStringRepresentedInteger } from '../validators/basicTypeValidators';

const router = express.Router();

router.get(
	'/',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`User is not logged in`, 400);
		}
		let result;
		const queryTerm = req.query.queryTerm as string | undefined;
		if (!req.query.queryTerm && !req.query.page) {
			result = await getInitialMovies();
		} else {
			if (!isStringRepresentedInteger(req.query.page) || !isStringRepresentedInteger(req.query.limit)) {
				throw new ValidationError(`Limit and offset should be string represented integers`);
			}
			result = await getInitialMovies(queryTerm, Number(req.query.page), Number(req.query.limit));
		}
		res.status(200).json(result);
	})
);

export default router;
