import express from 'express';
import asyncHandler from 'express-async-handler';
import { CustomRequest, SearchQuerySchema } from '../types';
import { getMovies } from '../services/library';
import { sessionExtractor } from '../utils/middleware';
import { AppError, ValidationError } from '../errors';
import { isRight } from 'fp-ts/lib/Either';

const router = express.Router();

router.post(
	'/',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`libraryUserNotLoggedIn`, 400);
		}
		const searchQuery = SearchQuerySchema.decode(req.body);
		if (!isRight(searchQuery)) {
			throw new ValidationError(`errorParsingSearchQuery`);
		}
		const result = await getMovies(searchQuery.right);
		res.status(200).json(result);
	})
);

export default router;
