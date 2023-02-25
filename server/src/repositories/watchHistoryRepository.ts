import pool from '../db';
import { getDate, getString } from '../dbUtils';
import { IMDB, WatchHistory } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const watchHistoryMapper = (row: any): WatchHistory => {
	return {
		id: getString(row['id']),
		userId: getString(row['user_id']),
		downloadsId: getString(row['downloads_id']),
		lastWatched: getDate(row['last_time_watched'])
	};
};

const createWatchRecord = async (userId: string, downloadsId: string): Promise<WatchHistory> => {
	const query = {
		text: 'insert into watch_history(user_id, downloads_id) values($1, $2) returning *',
		values: [userId, downloadsId]
	};

	const res = await pool.query(query);
	return watchHistoryMapper(res.rows[0]);
};

const createWatchRecordWithTime = async (userId: string, downloadsId: string, date: string): Promise<WatchHistory> => {
	const query = {
		text: 'insert into watch_history(user_id, downloads_id, last_time_watched) values($1, $2, $3) returning *',
		values: [userId, downloadsId, new Date(date)]
	};

	const res = await pool.query(query);
	return watchHistoryMapper(res.rows[0]);
};

const getLastWatchForMovie = async (downloadsId: string): Promise<WatchHistory | undefined> => {
	const query = {
		text: `select * from watch_history where downloads_id = $1 
                order by last_time_watched desc
				limit 1`,
		values: [downloadsId]
	};

	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return watchHistoryMapper(res.rows[0]);
};

const isWatchedByUser = async (userId: string, imdb: IMDB): Promise<boolean> => {
	const query = {
		text: `SELECT *
			FROM watch_history wh
			INNER JOIN downloads d ON wh.downloads_id = d.id
			WHERE wh.user_id = $1
		  	AND d.imdb = $2;`,
		values: [userId, imdb]
	};

	const res = await pool.query(query);
	if (!res.rowCount) {
		return false;
	}
	return true;
};

export { createWatchRecord, getLastWatchForMovie, createWatchRecordWithTime, isWatchedByUser };

//schema:
// id bigserial not null primary key,
// user_id bigserial not null,
// downloads_id bigserial not null,
// last_time_watched timestamptz not null default now()

//adding imdb in schema might have been a better solution
