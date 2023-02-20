import pool from '../db';
import { getString, getNumber, getStringOrUndefined } from '../dbUtils';
import { ReviewType, UserReview } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reviewsMapper = (row: any): ReviewType => {
	return {
		text: getString(row['text']),
		rating: getNumber(row['rating']),
		userId: getString(row['user_id']),
		username: getString(row['username']),
		photo: getStringOrUndefined(row['photo'])
	};
};

const getTotalReviewsCount = async (ytsMovieId: string): Promise<number> => {
	const query = {
		text: 'select count(*) from reviews where yts_id = $1',
		values: [ytsMovieId]
	};
	const res = await pool.query(query);
	return Number(res.rows[0].count);
};

const getReviews = async (ytsMovieId: string, page: number): Promise<ReviewType[]> => {
	const query = {
		text: `select text, rating, user_id,
					(select username from users where id = user_id) as username,
					(select avatar from users where id = user_id) as photo
				from reviews where yts_id = $1
				order by created_at desc
				limit $2 offset $3`,
		values: [ytsMovieId, page * 8, (page - 1) * 8]
	};
	const res = await pool.query(query);
	if (!res.rowCount) {
		return [];
	}
	return res.rows.map((row) => reviewsMapper(row));
};

const addReview = async (review: UserReview, userId: string, ytsMovieId: string) => {
	const query = {
		text: 'insert into reviews (text, rating, user_id, yts_id) values ($1, $2, $3, $4)',
		values: [review.text, review.rating, userId, ytsMovieId]
	};
	await pool.query(query);
};

export { getReviews, addReview, getTotalReviewsCount };
