import pool from '../db';
import { getString } from '../dbUtils';
import { IMDB, SubtitleDBData } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const subtitleMapper = (row: any): SubtitleDBData => {
	return {
		id: getString(row['id']),
		path: getString(row['path']),
		imdb: getString(row['imdb']) as IMDB,
		language: getString(row['language'])
	};
};

const findSubtitlesFileEntry = async (imdbId: string, language: string): Promise<SubtitleDBData | undefined> => {
	const query = {
		text: 'select * from subtitles where imdb = $1 and language = $2',
		values: [imdbId, language]
	};

	const res = await pool.query(query);
	if (!res.rowCount) {
		return undefined;
	}
	return subtitleMapper(res.rows[0]);
};

const getSubtitlesFileEntries = async (imdbId: string): Promise<SubtitleDBData[] | []> => {
	const query = {
		text: 'select * from subtitles where imdb = $1',
		values: [imdbId]
	};

	const res = await pool.query(query);
	if (!res.rowCount) return [];
	return res.rows.map((entry) => subtitleMapper(entry));
};

const checkSubtitlesFileEntry = async (imdbId: string): Promise<boolean> => {
	const query = {
		text: 'select * from subtitles where imdb = $1',
		values: [imdbId]
	};

	const res = await pool.query(query);
	if (!res.rowCount) return false;

	return true;
};

const addSubtitlesFileEntry = async (imdbId: string, filePath: string, language: string): Promise<SubtitleDBData> => {
	const alreadyDownloadedFile = await findSubtitlesFileEntry(imdbId, language);
	if (alreadyDownloadedFile) return alreadyDownloadedFile;

	const query = {
		text: 'insert into subtitles(imdb, path, language) values($1, $2, $3) returning *',
		values: [imdbId, filePath, language]
	};

	const res = await pool.query(query);
	return subtitleMapper(res.rows[0]);
};

export { findSubtitlesFileEntry, getSubtitlesFileEntries, checkSubtitlesFileEntry, addSubtitlesFileEntry };
