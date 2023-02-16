import { LanguageOption, IMDB, StreamQuality } from '../types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isNumber = (value: unknown): value is number => {
	return typeof value === 'number' || value instanceof Number;
};

const isNumberOrUndefined = (value: unknown): value is number | undefined => {
	return value === undefined || typeof value === 'number' || value instanceof Number;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringArray = (arr: any): arr is string[] => {
	if (!Array.isArray(arr)) return false;
	for (let i = 0; i < arr.length; i++) {
		if (!isString(arr[i])) {
			return false;
		}
	}
	return true;
};

const isStringRepresentedInteger = (string: unknown): string is string => {
	if (typeof string !== 'string') return false;
	const num = Number(string);
	if (!Number.isInteger(num)) return false;
	if (num <= 0) return false;
	return true;
};

const isLanguageOption = (languageOption: unknown): languageOption is LanguageOption => {
	return languageOption === 'enUS' || languageOption === 'ruRU' || languageOption === 'svSE';
};

const isPhotoObject = (photo: unknown): photo is { imageDataUrl: string } => {
	if (photo && typeof photo === 'object' && 'imageDataUrl' in photo) {
		return true;
	}
	return false;
};

const isIMDB = (id: unknown): id is IMDB => {
	if (isString(id) && id.match(/(?=^.{9,10}$)(^tt[\d]{7,8})$/)) return true;
	return false;
};

const isQuality = (quality: unknown): quality is StreamQuality => {
	return quality === '720p' || quality === '1080p' || quality === '3D';
};
export { isString, isNumber, isNumberOrUndefined, isDate, isStringArray, isStringRepresentedInteger, isLanguageOption, isPhotoObject, isIMDB, isQuality };
