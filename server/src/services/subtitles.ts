import { LanguageOption, OSApiPayload, OSDownloadPayload, SubtitleAttributes, SubtitleFileId } from '../types';
import { addSubtitlesFileEntry, checkSubtitlesFileEntry, getSubtitlesFileEntries } from '../repositories/subtitlesRepository';
import { extractImdbBaseId, getSubtitleAttributes } from '../utils/subtitlesHelpers';
import axios from 'axios';
import fs = require('fs');

const getSubtitleLink = async (fileId: number) => {
	const params = { file_id: fileId, sub_format: 'webvtt' };
	const config = {
		headers: {
			Accept: 'application/json',
			'Api-Key': process.env.OPEN_SUBTITLES_API,
			'Content-Type': 'application/json'
		}
	};
	try {
		const res = await axios.post<OSDownloadPayload>(`https://api.opensubtitles.com/api/v1/download`, { ...params }, config);
		return res.data.link;
	} catch (err) {
		console.log(`Failed to get subtitle source: `, err); //rm later
	}
	return undefined;
};

const downloadFile = async (movieId: string, language: string, downloadLink: string) => {
	try {
		const dir = `./subtitles/${movieId}`;
		!fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });

		const path = `${dir}/${movieId}-${language}.vtt`;
		const res = await axios.get(downloadLink);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		fs.writeFile(path, res.data, (err) => err && console.log(err));
		await addSubtitlesFileEntry(movieId, path, language);
		return true;
	} catch (err) {
		console.log(err); //rm later
		return false;
	}
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

const getFileIdsByLanguage = (payload: OSApiPayload): SubtitleFileId[] => {
	const subtitlesByLanguage: { [key: string]: SubtitleAttributes } = {};
	const subtitleAttributes = getSubtitleAttributes(payload);

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

	return Object.values(subtitlesByLanguage).map((value) => {
		return { language: value.language, fileId: value.files[0].file_id };
	});
};

export const downloadMovieSubtitles = async (imdbId: string): Promise<boolean> => {
	if (!(await checkSubtitlesFileEntry(imdbId))) {
		const imdbBaseId = extractImdbBaseId(imdbId);
		try {
			const config = {
				headers: {
					'Api-Key': process.env.OPEN_SUBTITLES_API,
					'Content-Type': 'application/json'
				}
			};
			const apiResponse = await axios.get<OSApiPayload>(`https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${imdbBaseId}`, config);
			const filesByLanguage = getFileIdsByLanguage(apiResponse.data);
			await downloadSubtitles(imdbId, filesByLanguage);
			return true;
		} catch (error) {
			console.log(error); //rm later?
			return false;
		}
	} else {
		return true;
	}
};

export const getSubtitleTracks = async (imdbId: string, userLanguage: LanguageOption) => {
	const subtitles = await getSubtitlesFileEntries(imdbId);
	const languageCode = userLanguage.substring(0, 2);
	const defaultLanguage = subtitles.find((subtitle) => subtitle.language === languageCode) ? languageCode : 'en';
	console.log(defaultLanguage);
	const subtitleTracks = subtitles.map((entry) => {
		return {
			kind: 'subtitles',
			src: process.env.REACT_APP_BACKEND_URL + `/api/subtitles/${imdbId}/${entry.language}`,
			srcLang: entry.language,
			label: entry.language,
			default: entry.language === defaultLanguage ? true : false
		};
	});
	return subtitleTracks;
};
