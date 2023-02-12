import express from 'express';
import asyncHandler from 'express-async-handler';
import { getInitialMovies } from '../services/library';
import { sessionExtractor } from '../utils/middleware';
import { AppError, ValidationError } from '../errors';
import { CustomRequest, QuerySchema } from '../types';
import { isRight } from 'fp-ts/lib/Either';

const router = express.Router();

router.post(
	'/',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`User is not logged in`, 400);
		}
		const query = QuerySchema.decode(req.body);
		if (!isRight(query)) {
			throw new ValidationError(`Error parsing query: ${query.left}`);
		}
		const result = await getInitialMovies(query.right);
		res.status(200).json(result);
	})
);

export default router;
