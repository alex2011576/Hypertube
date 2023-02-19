import { NewReviewType } from "../types";
import { isString, isNumber, isStringRepresentedInteger } from './basicTypeValidators';
import { ValidationError } from '../errors';

type Fields = {
	text: unknown;
	rating: unknown;
	ytsId: unknown;
	userId: string;
};

const parseText = (text: unknown): string => {
	if (!text || !isString(text)) {
		throw new ValidationError("movieReviewTextNotString");
	}
	const trimmedText = text.trim();
	if (!trimmedText) {
		throw new ValidationError("movieReviewTextMissing");
	}
	if (trimmedText.length > 300) {
		throw new ValidationError("movieReviewTextTooLong");
	}
	return trimmedText;
};

const parseRating = (rating: unknown): number => {
	if (!rating) {
		throw new ValidationError("movieReviewRatingMissing");
	}
	if (!isNumber(rating)) {
		throw new ValidationError("movieReviewRatingNotNumber");
	}
	if (rating < 0 || rating > 5) {
		throw new ValidationError("movieReviewRatingOutOfRange");
	}
	return rating;
};

const parseYtsId = (ytsId: unknown): string => {
	if (!ytsId || !isStringRepresentedInteger(ytsId)) {
		throw new ValidationError(`movieReviewsNotFound`);
	}
	const trimmedYtsId = ytsId.trim();
	if (!trimmedYtsId) {
		throw new ValidationError("movieMovieIdMissing");
	}
	return trimmedYtsId;
};

export const parseNewReviewPayload =  ({ text, rating, ytsId, userId }: Fields): NewReviewType => {
	const newReview: NewReviewType = {
		text: parseText(text),
		rating: parseRating(rating),
		userId: userId,
		ytsId: parseYtsId(ytsId)
	};
	return newReview;
};
