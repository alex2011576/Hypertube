import axios from 'axios';
import fs = require('fs');
import { addSubtitlesFileEntry, checkSubtitlesFileEntry, getSubtitlesFileEntries } from '../repositories/subtitlesRepository';

export const extractImdbBaseId = (imdbId: string) => {
	//imdb Id shouldn't have tt or tt0 in the beginning
	const numericImdbId = imdbId.split('tt')[1];
	return numericImdbId[0] === '0' ? numericImdbId.substring(1) : numericImdbId;
};

type OSApiPayload = {
	data: OSSubtitlesPayload[];
};

type OSSubtitlesPayload = {
	id: string;
	type: string;
	attributes: SubtitleAttributes;
};

type OSDownloadPayload = {
	link: string;
};

type SubtitleFileData = {
	file_id: number;
	cd_number: number;
	file_name: string;
};

type SubtitleAttributes = {
	language: string;
	files: SubtitleFileData[];
	[key: string]: string | number | boolean | SubtitleFileData[];
};

type SubtitleFileId = {
	language: string;
	fileId: number;
};

const languages = ['en', 'ru', 'sv'];

const getSubtitleLink = async (fileId: number) => {
	const OSApiKey = process.env.OPEN_SUBTITLES_API;

	const params = { file_id: fileId, sub_format: 'webvtt' };
	const config = {
		headers: {
			Accept: 'application/json',
			'Api-Key': OSApiKey,
			'Content-Type': 'application/json'
		}
	};
	try {
		const res = await axios.post<OSDownloadPayload>(`https://api.opensubtitles.com/api/v1/download`, { ...params }, config);
		return res.data.link;
	} catch (err) {
		console.log(`Failed to get subtitle source: `, err);
	}

	return undefined;
};

const downloadFile = async (movieId: string, language: string, downloadLink: string) => {
	const dir = `./subtitles/${movieId}`;
	!fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });

	const path = `${dir}/${movieId}-${language}.vtt`;
	try {
		const res = await axios.get(downloadLink);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		fs.writeFile(path, res.data, (err) => {
			err && console.log(err);
		});

		await addSubtitlesFileEntry(movieId, path, language);

		return true;
	} catch (err) {
		console.log(err);
	}
	return false;
};

const downloadSubtitles = async (imdbId: string, subtitleFileIds: SubtitleFileId[]) => {
	try {
		await Promise.all(
			subtitleFileIds.map(async (file) => {
				const downloadLink = await getSubtitleLink(file.fileId);
				if (!downloadLink) return undefined;
				return await downloadFile(imdbId, file.language, downloadLink);
			})
		);
	} catch (err) {
		console.log(err);
	}
};

const getFileIdsByLanguage = (subtitleAttributes: SubtitleAttributes[]) => {
	const subtitlesByLanguage: { [key: string]: SubtitleAttributes } = {};

	subtitleAttributes.forEach((subs) => {
		const language = subs.language;
		if (language in subtitlesByLanguage) {
			if (subs.download_count > subtitlesByLanguage[language].download_count) {
				subtitlesByLanguage[language] = subs;
			}
		} else {
			subtitlesByLanguage[language] = subs;
		}
	});

	const filesData: SubtitleFileId[] = Object.values(subtitlesByLanguage).map((value) => {
		return { language: value.language, fileId: value.files[0].file_id };
	});

	return filesData;
};

export const downloadMovieSubtitles = async (imdbId: string): Promise<boolean> => {
	const OSApiKey = process.env.OPEN_SUBTITLES_API;

	if (!(await checkSubtitlesFileEntry(imdbId))) {
		const imdbBaseId = extractImdbBaseId(imdbId);
		const config = {
			headers: {
				'Api-Key': OSApiKey,
				'Content-Type': 'application/json'
			}
		};

		try {
			const apiResponse = await axios.get<OSApiPayload>(`https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${imdbBaseId}`, config);

			const subtitleAttributes: SubtitleAttributes[] = apiResponse.data.data
				.filter((subs: OSSubtitlesPayload) => {
					return languages.includes(subs.attributes.language) && subs.attributes.fps !== 25;
				})
				.map((subs) => subs.attributes);

			const filesByLanguage = getFileIdsByLanguage(subtitleAttributes);

			await downloadSubtitles(imdbId, filesByLanguage);
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	} else {
		return true;
	}
};

export const getSubtitleTracks = async (imdbId: string) => {
	const subtitles = await getSubtitlesFileEntries(imdbId);

	const subtitleTracks = subtitles.map((entry) => {
		return {
			kind: 'subtitles',
			src: process.env.REACT_APP_BACKEND_URL + `/api/subtitles/${imdbId}/${entry.language}`,
			srcLang: entry.language,
			label: entry.language,
			default: true
		};
	});
	return subtitleTracks;
};
