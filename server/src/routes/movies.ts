import express from 'express';
import asyncHandler from 'express-async-handler';
import { isStringRepresentedInteger, isNumber } from '../validators/basicTypeValidators';
import { CustomRequest, SearchQuerySchema } from '../types';
import { AppError, ValidationError } from '../errors';
import { sessionExtractor } from '../utils/middleware';
import { getMovies } from '../services/movies';
import { getMovieData } from '../services/movie';
import { isRight } from 'fp-ts/lib/Either';
import { getMovieReviews, addMovieReview } from '../services/movies';
import { parseNewReviewPayload } from '../validators/reviewPayloadValidators';

const router = express.Router();

router.post(
	'/',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`moviesUserNotLoggedIn`, 400);
		}
		const searchQuery = SearchQuerySchema.decode(req.body);
		if (!isRight(searchQuery)) {
			throw new ValidationError(`errorParsingSearchQuery`);
		}
		const result = await getMovies(searchQuery.right);
		res.status(200).json(result);
	})
);

router.get(
	'/:id',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`moviesUserNotLoggedIn`, 400);
		}
		if (!isStringRepresentedInteger(req.params.id)) {
			throw new AppError(`movieMovieNotFound`, 400);
		}
		const userId = req.session.userId;
		const ytsMovieId = req.params.id;

		const result = await getMovieData(userId, ytsMovieId);
		if (!result) {
			throw new AppError(`movieMovieNotFound`, 400);
		}
		res.status(200).json(result);
	})
);

router.get(
	'/:id/reviews',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`moviesUserNotLoggedIn`, 400);
		}
		const ytsMovieId = req.params.id;
		const page = req.query.page;
		if (!isStringRepresentedInteger(ytsMovieId)) {
			throw new AppError(`movieReviewsNotFound`, 400);
		}
		if (!isStringRepresentedInteger(page)) {
			throw new AppError(`movieReviewsPageInvalidType`, 400);
		}
		if (!isNumber(Number(page))) {
			throw new AppError(`movieReviewsPageInvalidType`, 400);
		}

		const result = await getMovieReviews({ytsMovieId: ytsMovieId, page: Number(page)});
		res.status(200).json(result);
	})
);

router.post(
	'/:id/reviews',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`moviesUserNotLoggedIn`, 400);
		}
		const newReview = parseNewReviewPayload({text: req.body.text, rating: req.body.rating, userId: req.session.userId, ytsId: req.params.id});
		await addMovieReview(newReview);
		res.status(201).end();
	})
);

export default router;
