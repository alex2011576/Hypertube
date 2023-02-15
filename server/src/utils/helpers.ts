import Jimp from 'jimp';
import { findUserByUsername } from '../repositories/userRepository';
import { BaseUser } from '../types';

export const adjustUsername = async (user: BaseUser) => {
	let oldUserSameUsername = await findUserByUsername(user.username);

	if (oldUserSameUsername && oldUserSameUsername.email !== user.email) {
		while (oldUserSameUsername) {
			user.username += String(Math.floor(Math.random() * (100000 - 111) + 111));
			oldUserSameUsername = await findUserByUsername(user.username);
		}
	}
};

export const findDuplicates = (arr: string[]) => {
	return arr.filter((item, index) => arr.indexOf(item) !== index);
};

export const checkIfDuplicatesExist = (arr: string[]) => {
	return new Set(arr).size !== arr.length;
};

//might fail when offfset back by local if not same timezone as front
export const getAge = (dateString: string): number => {
	const today = new Date();
	const birthDate = new Date(dateString);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

export const assertNever = (value: string): never => {
	throw new Error(`Unhandled discriminated union member: ${value}`);
};

export const imgUrlToBase64 = async (url: string | undefined | null) => {
	if (!url) return undefined;
	const jimpInstance = await Jimp.read(url);
	try {
		return await jimpInstance.getBase64Async(jimpInstance.getMIME());
	} catch {
		return undefined;
	}
};

export const getMagnetLink = (filmTitle: string, hash: string) => {
	return `magnet:?xt=urn:btih:${hash}&dn=${filmTitle.split(' ').join('+')}`;
};

export function convertBytes(bytes: number): string {
	if (bytes < 1024) {
		return bytes + ' B';
	} else if (bytes < 1048576) {
		return (bytes / 1024).toFixed(2) + ' KB';
	} else if (bytes < 1073741824) {
		return (bytes / 1048576).toFixed(2) + ' MB';
	} else {
		return (bytes / 1073741824).toFixed(2) + ' GB';
	}
}
