import { OSApiPayload, SubtitleAttributes, OSSubtitlesPayload } from '../types';

const languages = ['en', 'ru', 'sv'];

export const extractImdbBaseId = (imdbId: string) => {
	const numericImdbId = imdbId.split('tt')[1];
	return numericImdbId[0] === '0' ? numericImdbId.substring(1) : numericImdbId;
};

export const getSubtitleAttributes = (payload: OSApiPayload): SubtitleAttributes[] => {
	return payload.data
		.filter((subs: OSSubtitlesPayload) => {
			return languages.includes(subs.attributes.language) && subs.attributes.fps !== 25;
		})
		.map((subs) => subs.attributes);
};
