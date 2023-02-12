import express from 'express';
import asyncHandler from 'express-async-handler';
import { CustomRequest, SearchQuerySchema } from '../types';
import { getInitialMovies } from '../services/library';
import { sessionExtractor } from '../utils/middleware';
import { AppError, ValidationError } from '../errors';
import { isRight } from 'fp-ts/lib/Either';

const router = express.Router();

router.post(
	'/',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`User is not logged in`, 400);
		}
		const searchQuery = SearchQuerySchema.decode(req.body);
		if (!isRight(searchQuery)) {
			throw new ValidationError(`Error parsing query: ${searchQuery.left}`);
		}
		const result = await getInitialMovies(searchQuery.right);
		res.status(200).json(result);
	})
);

export default router;
