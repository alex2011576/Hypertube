import pool from '../db';
import { getBoolean, getDate, getStreamQuality, getString } from '../dbUtils';
import { FileInfo, IMDB, StreamQuality } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const downloadsMapper = (row: any): FileInfo => {
	return {
		id: getString(row['id']),
		path: getString(row['path']),
		type: getString(row['type']),
		size: Number(getString(row['size'])),
		completed: getBoolean(row['completed']),
		imdb: getString(row['imdb']) as IMDB,
		quality: getStreamQuality(row['quality']),
		downloadTime: getDate(row['download_time'])
	};
};

const searchInDownloads = async (imdb: IMDB, quality: StreamQuality): Promise<FileInfo | undefined> => {
	const query = {
		text: 'select * from downloads where imdb = $1 and quality = $2',
		values: [imdb, quality]
	};

	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return downloadsMapper(res.rows[0]);
};

const recordDownloading = async (info: FileInfo): Promise<FileInfo> => {
	const isRecorded = await searchInDownloads(info.imdb, info.quality);
	if (isRecorded) return isRecorded;

	const query = {
		text: 'insert into downloads(path, type, size, imdb, quality) values($1, $2, $3, $4, $5) returning *',
		values: [info.path, info.type, info.size, info.imdb, info.quality]
	};

	const res = await pool.query(query);
	return downloadsMapper(res.rows[0]);
};

const setDownloadComplete = async (imdb: IMDB, quality: StreamQuality): Promise<void> => {
	const query = {
		text: `update downloads set completed = 'YES' where imdb = $1 and quality = $2 returning *`,
		values: [imdb, quality]
	};
	await pool.query(query);
};

export { searchInDownloads, recordDownloading, setDownloadComplete };
// id, path, type, size, completed, imdb, quality, downloadTime;
// id, path, type, size, completed, imdb, quality, download_time;
