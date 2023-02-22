import { recordDownloading, searchInDownloads, setDownloadComplete } from '../repositories/downloadsRepository';
import { FileInfo, IMDB, StreamContent, StreamQuality, StreamStatus, YtsMovieDetailsJson } from '../types';
import axios from 'axios';
import { AppError, TorrentError } from '../errors';
import { checkFileSize, convertBytes, fileIsDownloading, generateMagnetLink } from '../utils/helpers';
import path from 'path';
import torrentStream from 'torrent-stream';
import fs from 'fs';

export const getStreamStatus = async (imdb: IMDB, quality: StreamQuality): Promise<StreamStatus> => {
	let movieFile: FileInfo;
	const isInDownloads = await searchInDownloads(imdb, quality);
	console.log('CHECKIMG STREAM STATUS\n');
	if (isInDownloads && isInDownloads.completed) {
		return { ready: true, progress: '100' };
	} else if (isInDownloads && (await fileIsDownloading(`movies/${isInDownloads.path}`))) {
		movieFile = isInDownloads;
	} else {
		const magnetLink = await getTorrentFileMagnetLink(imdb, quality);
		movieFile = await downloadTorrent(magnetLink, imdb, quality);
	}

	const currentSize = checkFileSize(`movies/${movieFile.path}`);
	const progress = (currentSize / movieFile.size) * 100;
	return {
		ready: true,
		progress: progress.toFixed(2),
		downloaded: convertBytes(currentSize),
		info: `Ready to play, ${progress.toFixed(2)}% (${convertBytes(currentSize)}) downloaded`
	};
};

const getTorrentFileMagnetLink = async (imdb: IMDB, quality: StreamQuality) => {
	console.log('\nSearching for avaliable torrents...');

	const { data }: { data: YtsMovieDetailsJson } = await axios.get(
		`https://yts.mx/api/v2/movie_details.json?imdb_id=${imdb}`,
		{
			headers: {
				Accept: 'application/json'
			}
		}
	);
	if (!data || !data.data || !data.data.movie || !data.data.movie.torrents) {
		throw new TorrentError(`torrentNotTorrents`);
	}
	const movieData = data.data.movie;

	//filer by quality
	let torrents = movieData.torrents.filter((torrent) => torrent.quality === quality);
	if (torrents.length < 1) throw new TorrentError(`torrentNotTorrentsWithQuality`);
	//sort by seeds
	if (torrents.length > 1) {
		torrents = torrents.sort((a, b) => (a.seeds > b.seeds ? -1 : 1));
	}

	const filmTitle = movieData.title_long;
	const hash = torrents[0].hash;
	if (!filmTitle || !hash) throw new TorrentError(`torrentNotTorrents`);
	console.log('');

	console.log('Torrents found!\n');
	const magnetLink = generateMagnetLink(filmTitle, hash);
	return magnetLink;
};

const downloadTorrent = async (magnetLink: string, imdb: IMDB, quality: StreamQuality): Promise<FileInfo> => {
	let resolved = false;
	let ready = false;
	const videoPath = path.resolve(__dirname, '../../movies');
	const options = {
		trackers: [
			'udp://open.demonii.com:1337/announce',
			'udp://tracker.openbittorrent.com:80',
			'udp://tracker.coppersurfer.tk:6969',
			'udp://glotorrents.pw:6969/announce',
			'udp://tracker.opentrackr.org:1337/announce',
			'udp://torrent.gresille.org:80/announce',
			'udp://p4p.arenabg.com:1337',
			'udp://tracker.leechers-paradise.org:6969',
			'udp://tracker.opentrackr.org:1337',
			'udp://9.rarbg.com:2810',
			'udp://tracker.openbittorrent.com:80',
			'udp://tracker.openbittorrent.com:6969',
			'udp://opentracker.i2p.rocks:6969',
			'udp://tracker.torrent.eu.org:451',
			'udp://open.stealth.si:80',
			'udp://vibe.sleepyinternetfun.xyz:1738',
			'udp://tracker2.dler.org:80',
			'udp://tracker1.bt.moack.co.kr:80',
			'udp://tracker.zerobytes.xyz:1337',
			'udp://tracker.tiny-vps.com:6969',
			'udp://tracker.theoks.net:6969',
			'udp://tracker.swateam.org.uk:2710',
			'udp://tracker.publictracker.xyz:6969',
			'udp://tracker.monitorit4.me:6969',
			'udp://tracker.moeking.me:6969',
			'udp://tracker.lelux.fi:6969',
			'udp://tracker.encrypted-data.xyz:1337'
		],
		path: videoPath
	};

	let file: TorrentStream.TorrentFile;
	let fileInfo: FileInfo;
	let progress = -1;
	console.log('Starting download torrent process!\n');

	return new Promise((resolve, reject) => {
		console.log('Starting torrent engine...');
		const engine = torrentStream(magnetLink, options);
		const timeout = setTimeout(() => {
			if (!ready) {
				console.log('Failed to fetch metadata! Aborting...\n');
				engine.destroy(() => {
					console.log('Engine connection destroyed...\n');
					if (!resolved) {
						resolved = true;
						reject(new TorrentError(`torrentSelfDestruction`));
					}
				});
			}
		}, 20000);

		engine.on('torrent', () => {
			console.log('Metadata has been fetched!');
		});

		engine.on('ready', () => {
			console.log('Engine is ready to use!');
			clearTimeout(timeout);
			ready = true;
			const files = engine.files.filter((file) => file.name.endsWith('.mp4') || file.name.endsWith('.mkv') || file.name.endsWith('.webm'));
			if (files.length === 0) {
				engine.destroy(() => {
					console.log('Engine connection destroyed...\n');
					if (!resolved) {
						resolved = true;
						reject(new TorrentError(`torrentNotSupported`));
					}
				});
			}
			// console.log(`found ${files.length} files`);

			file = files[0];

			fileInfo = {
				// path: `${videoPath}/${file.path}`,
				path: `${file.path}`,
				type: file.name.split('.').pop() as string,
				size: file.length,
				imdb: imdb,
				quality: quality
			};
			// console.log(file.name);
			// console.log(file.length);
			console.log(`Attempting to download: ${file.name}`);

			file.select();
			recordDownloading(fileInfo).catch((err) => {
				void err;
				// console.log(getErrorMessage(err));
				console.log('Faild to record download, aborting...');
				engine.destroy(() => {
					console.log('Engine connection destroyed...\n');
					if (!resolved) {
						resolved = true;
						reject(new AppError('streamingRecordDownload', 500));
					}
				});
			});
		});

		engine.on('download', () => {
			if (file) {
				const donwloaded = checkFileSize(`movies/${file.path}`);
				const ratio = (donwloaded / file.length) * 100;
				if (ratio >= progress) {
					progress = ratio + 1;
					console.log(`\nDownloading ${file.name} in ${fileInfo.quality}...`);
					console.log(`Progress: ${ratio.toFixed(0)}% (${convertBytes(donwloaded)} / ${convertBytes(file?.length)} bytes)\n`);
				}
				if (!resolved && donwloaded >= 5 * 1024 * 1024) {
					resolved = true;
					resolve(fileInfo);
				}
			}
		});

		engine.on('idle', () => {
			engine.destroy(() => {
				searchInDownloads(imdb, quality)
					.then((isInDownloads) => {
						if (isInDownloads) {
							console.log('All files were succesfully downloaded!');
							setDownloadComplete(imdb, quality)
								// .catch((err) => console.log(`Download completion update failed:\n${getErrorMessage(err)}\n Trying update competion again...`))
								.catch(() => console.log(`Download completion update failed:\n Trying to update completion again...`))
								.then(() => setDownloadComplete(imdb, quality))
								// .catch((err) => console.log(`Download completion update failed again:\n${getErrorMessage(err)}\n`));
								.catch(() => console.log(`Download completion update failed again!(not severe)\n`));
							if (!resolved) {
								resolved = true;
								resolve(fileInfo);
							}
						} else {
							console.log('Engine failed to download files. Initiating self-destruction...');
							if (!resolved) {
								resolved = true;
								reject(new TorrentError('torrentSelfDestruction'));
							}
						}
					})
					.catch(() => {
						console.log('Failure to access database!');
						throw new AppError('streamingSearchInDownload', 500);
					});
				console.log('Engine connection destroyed...\n');
			});
		});
	});
};
// engine.swarm.downloaded shows how much was downloaded since initiation, but the download would continue if files has already existed. Since, it is a bad idea
//to log download ratio based on engine.swarm.downloaded

export const streamContent = async (imdb: IMDB, quality: StreamQuality, range: string): Promise<StreamContent> => {
	const movie = await searchInDownloads(imdb, quality);
	if (!movie) throw new AppError('streamingBeforeStatus', 400);
	const currentSize = checkFileSize(`movies/${movie.path}`);
	let code = 206;
	let start = Number(range.replace(/\D/g, ''));

	//might require further adjustments
	if (start > currentSize - 1) {
		start = 0;
		code = 416;
		const headers = {
			'Content-Range': `bytes */${currentSize}`
		};
		return { code: code, headers: headers, stream: undefined };
	}

	const CHUNK_SIZE = 10 ** 6; // 1MB
	const end = Math.min(start + CHUNK_SIZE, currentSize - 1);
	const contentLength = end - start + 1;

	const headers = {
		'Content-Range': `bytes ${start}-${end}/${currentSize}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': contentLength,
		'Content-Type': `video/${movie.type}`
	};

	const stream = fs.createReadStream(`movies/${movie.path}`, { start, end });
	stream.on('error', (err) => {
		void err;
		console.log('failure to create read stream');
		throw new AppError(`errorUnexpectedError`, 500);
	});
	return { code: code, headers: headers, stream: stream };
};
// export const streamContent = async (imdb: IMDB, quality: StreamQuality, range: string): Promise<StreamContent> => {
// 	const movie = await searchInDownloads(imdb, quality);
// 	if (!movie) throw new AppError('Movie not found', 404);
// 	// const currentSize = checkFileSize(`movies/${movie.path}`);
// 	let code = 206;
// 	let start = Number(range.replace(/\D/g, ''));
// 	if (start > movie.size - 1 ) {
// 		start = 0;
// 		code = 416;
// 	}
// 	//  else if (start > currentSize ) {
// 	// 	start = 0;
// 	// }
// 	const CHUNK_SIZE = 10 ** 6; // 1MB
// 	const end = Math.min(start + CHUNK_SIZE, movie.size - 1);
// 	const contentLength = end - start + 1;
// 	const headers = {
// 		'Content-Range': `bytes ${start}-${end}/${movie.size}`,
// 		'Accept-Ranges': 'bytes',
// 		'Content-Length': contentLength,
// 		'Content-Type': `video/${movie.type}`
// 	};
// 	const stream = fs.createReadStream(`movies/${movie.path}`, { start, end });
// 	stream.on('error', (err) => {
// 		console.log(err);
// 		throw new TorrentError(`Can't stream file`);
// 	});
// 	return { code: code, headers: headers, stream: stream };
// };
