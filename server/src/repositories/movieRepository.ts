import pool from '../db';
import { getString, getNumber, getStringOrUndefined } from '../dbUtils';
import { ReviewType, NewReviewType, GetReviewsData } from '../types';

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

const getReviews = async (data: GetReviewsData): Promise<ReviewType[] | undefined> => {
	const query = {
		text: `select text, rating, user_id,
					(select username from users where id = user_id) as username,
					(select avatar from users where id = user_id) as photo
				from reviews where yts_id = $1
				order by created_at desc
				limit $2 offset $3`,
		values: [data.ytsMovieId, data.page * 8, (data.page - 1) * 8]
	};
	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return res.rows.map((row) => reviewsMapper(row));
};

const addReview = async (data: NewReviewType) => {
	const query = {
		text: `insert into reviews (text, rating, user_id, yts_id)
				values ($1, $2, $3, $4)`,
		values: [data.text, data.rating, data.userId, data.ytsId]
	};
	await pool.query(query);
};

export { getReviews, addReview, getTotalReviewsCount };
