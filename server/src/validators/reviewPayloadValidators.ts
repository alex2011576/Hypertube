import { UserReview } from '../types';
import { isString, isNumber, isStringRepresentedInteger } from './basicTypeValidators';
import { ValidationError } from '../errors';

type Fields = {
	text: unknown;
	rating: unknown;
};

const parseText = (text: unknown): string => {
	if (!text || !isString(text)) {
		throw new ValidationError('movieReviewTextNotString');
	}
	const trimmedText = text.trim();
	if (!trimmedText) {
		throw new ValidationError('movieReviewTextMissing');
	}
	if (trimmedText.length > 300) {
		throw new ValidationError('movieReviewTextTooLong');
	}
	return trimmedText;
};

const parseRating = (rating: unknown): number => {
	if (!rating) return 0;
	if (!isStringRepresentedInteger(rating) && !isNumber(rating)) {
		throw new ValidationError('movieReviewRatingNotNumber');
	}
	if (Number(rating) < 0 || Number(rating) > 5) {
		throw new ValidationError('movieReviewRatingOutOfRange');
	}
	return Number(rating);
};

export const parseNewReviewPayload = ({ text, rating }: Fields): UserReview => {
	const newReview: UserReview = {
		text: parseText(text),
		rating: parseRating(rating)
	};
	return newReview;
};
