import Jimp from 'jimp';
import { findUserByUsername } from '../repositories/userRepository';
import { BaseUser, CustomRequest } from '../types';
import fs from 'fs';

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

export const generateMagnetLink = (filmTitle: string, hash: string) => {
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

// export const waitForFileToExist = (path: string): Promise<void> => {
// 	return new Promise<void>((resolve, _reject) => {
// 		const watcher = fs.watch(`movies`, (eventType: string, filename: string) => {
// 			if (eventType && filename) {
// 				console.log(eventType);
// 				console.log(filename);
// 				console.log('watch registered file event');
// 				watcher.close();
// 				resolve();
// 			}
// 		});

// 		if (fs.existsSync(`movies/${path}`)) {
// 			console.log('old file');
// 			watcher.close();
// 			resolve();
// 		}
// 	});
// };

export const isPasswordSet = (password: string): boolean => {
	if (password === 'notSet') return false;
	return true;
};

// export const watchFileSize = (filePath: string): Promise<number> => {
// 	return new Promise((resolve, reject) => {
// 		let watcher: fs.FSWatcher | null = null;
// 		let size = 0;

// 		const checkFileSize = () => {
// 			const stats = fs.statSync(`movies/${filePath}`);
// 			size = stats.size;
// 			if (size >= 5 * 1024 * 1024) {
// 				if (watcher) watcher.close();
// 				resolve(size);
// 			}
// 		};

// 		try {
// 			checkFileSize();
// 			watcher = fs.watch(`movies/${filePath}`, (eventType, _filename) => {
// 				if (eventType === 'change') {
// 					checkFileSize();
// 				}
// 			});
// 		} catch (err) {
// 			reject(err);
// 		}
// 	});
// };

export const checkFileSize = (filePath: string) => {
	const checkFileSize = () => {
		const stats = fs.statSync(`${filePath}`);
		return stats.size;
	};

	if (fs.existsSync(`${filePath}`)) {
		return checkFileSize();
	}
	return 0;
};

export const fileIsDownloading = async (filePath: string) => {
	console.log('Checking whether file is areading being downloaded...');
	return new Promise((resolve, _reject) => {
		let resolved = false;
		let watcher: fs.FSWatcher | null = null;

		const timeout = setTimeout(() => {
			console.log('File is not being downloaded yet!\n');
			if (!resolved) {
				if (watcher) watcher.close();
				resolved = true;
				resolve(false);
			}
		}, 20000);

		if (fs.existsSync(`${filePath}`)) {
			watcher = fs.watch(`${filePath}`, (eventType, _filename) => {
				if (eventType === 'change') {
					console.log('File is already being downloaded!\n');
					if (watcher) watcher.close();
					if (!resolved) {
						resolved = true;
						clearTimeout(timeout);
						resolve(true);
					}
				}
			});
		}
	});
};

export const waitForFileSize = async (start: number, path: string): Promise<void> => {
	const now = checkFileSize(path);
	if (now < start) {
		await new Promise((resolve) => setTimeout(resolve, 10000));
		console.log('timeout');
		await waitForFileSize(start, path);
	}
	console.log('streaming chunk');
};
// with clear on close
export const waitForFileSize2 = async (sizeExpected: number, path: string, req: CustomRequest): Promise<void> => {
	let resolved = false;
	return await new Promise((resolve, reject) => {
			const interval = setInterval(() => {
				// console.log('interval');
				if (sizeExpected <= checkFileSize(path) && !resolved) {
					resolved = true;
					console.log('enough loaded, interval stopped');
					clearInterval(interval);
					resolve();
				}
			}, 10000);
			req.on('close', () => { 
				if (!resolved) {
					resolved = true;
					console.log('connection broke, interval stopped');
					reject();
					clearInterval(interval);
				}
			});
	});
};
