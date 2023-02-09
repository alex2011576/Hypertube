import express from 'express';
import asyncHandler from 'express-async-handler';
import { AppError } from '../errors';
import { getInitialMovies } from '../services/library';
import { CustomRequest } from '../types';
import { sessionExtractor } from '../utils/middleware';

const router = express.Router();

router.get(
	'/',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`User is not logged in`, 400);
		}
		const result = await getInitialMovies();
		res.status(200).json(result);
	})
);

export default router;
