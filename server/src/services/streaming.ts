import { recordDownloading, searchInDownloads, setDownloadComplete } from '../repositories/downloadsRepository';
import { FileInfo, IMDB, StreamQuality, YtsMovieDetailsJson } from '../types';
import axios from 'axios';
import { getErrorMessage, TorrentError } from '../errors';
import { checkFileSize, convertBytes, getMagnetLink } from '../utils/helpers';
import path from 'path';
import torrentStream from 'torrent-stream';

export const getStreamStatus = async (imdb: IMDB, quality: StreamQuality) => {
	const isInDownloads = await searchInDownloads(imdb, quality);
	if (isInDownloads && isInDownloads.completed) {
		return 'Ready to play';
	} else {
		console.log('not in downloads');
		console.log('imdb:', imdb);

		const { data }: { data: YtsMovieDetailsJson } = await axios.get(
			// `https://yts.mx/api/v2/movie_details.json?imdb_id=tt1111111`, {
			`https://yts.mx/api/v2/movie_details.json?imdb_id=${imdb}`,
			{
				headers: {
					Accept: 'application/json'
				}
			}
		);
		if (!data || !data.data || !data.data.movie || !data.data.movie.torrents) {
			throw new TorrentError(`No torrents avaliable for movie with imdb=${imdb}`);
		}
		const movieData = data.data.movie;

		//filer by quality
		let torrents = movieData.torrents.filter((torrent) => torrent.quality === quality);
		if (torrents.length < 1) throw new TorrentError(`Quality ${quality} is not avaliable`);
		//sort by seeds
		if (torrents.length > 1) {
			torrents = torrents.sort((a, b) => (a.seeds > b.seeds ? -1 : 1));
		}

		const filmTitle = movieData.title_long;
		const hash = torrents[0].hash;
		if (!filmTitle || !hash) throw new TorrentError(`No torrents avaliable for movie with imdb=${imdb}`);

		const magnetLink = getMagnetLink(filmTitle, hash);

		const movieFile = await downloadTorrent(magnetLink, imdb, quality);
		const currentSize = checkFileSize(`movies/${movieFile.path}`);
		const progress = currentSize / movieFile.size * 100;
		return `Ready to play, ${progress.toFixed(2)}% (${convertBytes(currentSize)}) downloaded`;
	}
};

const downloadTorrent = async (magnetLink: string, imdb: IMDB, quality: StreamQuality): Promise<FileInfo> => {
	let resolved = false;
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
	const engine = torrentStream(magnetLink, options);
	let file: TorrentStream.TorrentFile;
	let fileInfo: FileInfo;
	let progress = -1;
	
	console.log(videoPath);
	return new Promise((resolve, reject) => {
		engine.on('torrent', () => {
			console.log('torrent');
		});

		engine.on('ready', () => {
			console.log('ready');
			const files = engine.files.filter((file) => file.name.endsWith('.mp4') || file.name.endsWith('.mkv') || file.name.endsWith('.webm'));
			if (files.length === 0) {
				engine.destroy(() => {
					console.log('Engine connection destroyed');
					if (!resolved) {
						resolved = true;
						reject(new TorrentError(`No torrents with supported formats are avaliable for movie with imdb=${imdb}`));
					}
				});
			}
			console.log(`found ${files.length} files`);

			file = files[0];

			fileInfo = {
				// path: `${videoPath}/${file.path}`,
				path: `${file.path}`,
				type: file.name.split('.').pop() as string,
				size: file.length,
				imdb: imdb,
				quality: quality
			};
			console.log(file.name);
			console.log(file.length);
			file.select();
			recordDownloading(fileInfo).catch((err) => {
				console.log(getErrorMessage(err));
				engine.destroy(() => {
					console.log('Engine connection destroyed');
					if (!resolved) {
						resolved = true;
						reject(new TorrentError('failed to save download info!'));
					}
				});
			});
		});

		engine.on('download', () => {
			if (file) {
				const donwloaded = checkFileSize(`movies/${file.path}`);
				const ratio = (donwloaded / file.length) * 100;
				if (ratio >= progress){
					progress = ratio + 1;
					console.log(`Downloading...`);
					console.log(`Progress: ${(ratio.toFixed(0))}% (${convertBytes(donwloaded)} / ${convertBytes(file?.length)} bytes)`);
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
				.then((isInDownloads)=>{
					if (isInDownloads) {
						console.log('All files downloaded');
						setDownloadComplete(imdb, quality)
							.catch((err) => console.log(`Download completion update failed:\n${getErrorMessage(err)}\n Trying update competion again...`))
							.then(() => setDownloadComplete(imdb, quality))
							.catch((err) => console.log(`Download completion update failed again:\n${getErrorMessage(err)}\n`));
						
						if (!resolved) {
							resolved = true;
							resolve(fileInfo);
						}
					} else {
						console.log('Files are not downloaded');
						if (!resolved) {
							resolved = true;
							reject(new TorrentError('autodistruction'));
						}
					}
					console.log('Engine connection destroyed');
				})
				.catch(() => console.log('error'));
			}); 
		});
	});
};
// engine.swarm.downloaded shows how much was downloaded since initiation, but the download would continue if files has already existed. Since, it is a bad idea
//to log download ratio based on engine.swarm.downloaded 

export const streamContent = async (imdb: IMDB, quality: StreamQuality, range: string): Promise<StreamContent> => {
	const movie = await searchInDownloads(imdb, quality);
	if (!movie) throw new AppError('Movie not found', 404);
	let code = 206;
	let start = Number(range.replace(/\D/g, ''));
	if (start > movie.size - 1) {
		start = 0;
		code = 416;
	}
	const CHUNK_SIZE = 10 ** 6; // 1MB
	const end = Math.min(start + CHUNK_SIZE, movie.size - 1);
	const contentLength = end - start + 1;
	const headers = {
		'Content-Range': `bytes ${start}-${end}/${movie.size}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': contentLength,
		'Content-Type': `video/${movie.type}`
	};
	const stream = fs.createReadStream(`movies/${movie.path}`, { start, end });
	return { code: code, headers: headers, stream: stream };
};
