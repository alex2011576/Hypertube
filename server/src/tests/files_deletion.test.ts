import { recordDownloading } from '../repositories/downloadsRepository';
import fs from 'fs';
import { mkdirp } from 'mkdirp';
// import { promises as fsPromises } from 'fs';
import { deleteIdleMovies } from '../services/movies';
import { createWatchRecordWithTime } from '../repositories/watchHistoryRepository';
import { FileInfo } from '../types';

describe('files deletion function', () => {
	const file1 = { direcory: 'movies/testfolder1', name: 'test1.txt', content: 'test1.txt, this is a test files', path: 'testfolder1/test1.txt' };
	const file2 = { direcory: 'movies/testfolder2', name: 'test2.txt', content: 'test2.txt, this is a test files', path: 'testfolder2/test2.txt' };
	const file3 = { direcory: 'movies/testfolder3', name: 'test3.txt', content: 'test3.txt, this is a test files', path: 'testfolder3/test3.txt' };
	let movie1: FileInfo;
	let movie2: FileInfo;
	let movie3: FileInfo;
	const writeFile = async (file: { direcory: string; name: string; content: string }) => {
		await mkdirp(file.direcory);
		fs.writeFileSync(`${file.direcory}/${file.name}`, file.content);
	};

	beforeEach(async () => {
		const p1 = writeFile(file1);
		const p2 = writeFile(file2);
		const p3 = writeFile(file3);
		await Promise.all([p1, p2, p3]);
		// await fsPromises.writeFile(`${__dirname}/../../movies/${path}`, 'test', 'utf8');
		movie1 = await recordDownloading({ path: file1.path, type: 'txt', size: 111, imdb: 'tt1111111', quality: '1080p' });
		movie2 = await recordDownloading({ path: file2.path, type: 'txt', size: 111, imdb: 'tt1111112', quality: '1080p' });
		movie3 = await recordDownloading({ path: file3.path, type: 'txt', size: 111, imdb: 'tt1111113', quality: '1080p' });
		await createWatchRecordWithTime('1', movie1.id as string, '1995-12-17T03:24:00');
		await createWatchRecordWithTime('1', movie2.id as string, new Date(Date.now()).toString());
		await createWatchRecordWithTime('1', movie3.id as string, '1995-12-17T03:24:00');
		expect(fs.existsSync(`movies/${movie1.path}`)).toBe(true);
		expect(fs.existsSync(`movies/${movie2.path}`)).toBe(true);
		expect(fs.existsSync(`movies/${movie3.path}`)).toBe(true);
		// expect(fs.existsSync(`${__dirname}/../../movies/${path}`)).toBe(false);
	});

	test('should delete file', async () => {
		console.log('here');
		await deleteIdleMovies();
		expect(fs.existsSync(`movies/${movie1.path}`)).toBe(false);
		expect(fs.existsSync(`movies/${movie2.path}`)).toBe(true);
		expect(fs.existsSync(`movies/${movie3.path}`)).toBe(false);
		// expect(fs.existsSync(`${__dirname}/../../movies/${path}`)).toBe(true);
	});

	afterAll(() => {
		const directory = movie2.path.split('/')[0];
		fs.rmSync(`movies/${directory}`, { recursive: true, force: true });
	});
});
