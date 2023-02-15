import { recordDownloading, searchInDownloads, setDownloadComplete } from '../repositories/downloadsRepository';
import { IMDB, StreamQuality, YtsMovieDetailsJson } from '../types';
import axios from 'axios';
import { getErrorMessage, TorrentError } from '../errors';
import { convertBytes, getMagnetLink } from '../utils/helpers';
import path from 'path';
import torrentStream from 'torrent-stream';

export const getStreamStatus = async (imdb: IMDB, quality: StreamQuality) => {
	const isInDownloads = await searchInDownloads(imdb, quality);
	if (isInDownloads && isInDownloads.completed) {
		console.log('complete in downloads');
		return 'in downloads';
	} else {
		console.log('not in downloads');
		console.log(imdb);

		const { data }: { data: YtsMovieDetailsJson } = await axios.get(
			// `https://yts.mx/api/v2/movie_details.json?imdb_id=tt1111111`, {
			`https://yts.mx/api/v2/movie_details.json?imdb_id=${imdb}`,
			{
				headers: {
					Accept: 'application/json'
				}
			}
		);
		// const movie = data.data.movie;
		if (!data || !data.data || !data.data.movie || !data.data.movie.torrents) {
			throw new TorrentError(`No torrents avaliable for movie with imdb=${imdb}`);
		}
		const movieData = data.data.movie;

		console.log(movieData.torrents);

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
		console.log(magnetLink);

		// try {
		const torrentFiles = await downloadTorrent(magnetLink, imdb, quality);

		console.log('resolved');
		void torrentFiles;
		// } catch (err) {
		// 	console.log(typeof err);
		// 	console.log('in error');
		// 	console.log(err as string);
			
		// 	throw new TorrentError(err as string);
		// }

		// console.log(movieData.data.movie['torrents'][1]);
		// console.log(movieData.data);

		return 'not in downloads';
	}
};

const downloadTorrent = async (magnetLink: string, imdb: IMDB, quality: StreamQuality) => {
	let resolved = false;
	const videoPath = path.resolve(__dirname, '../../assets');
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

			const fileInfo = {
				path: `${videoPath}/${file.path}`,
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
						// reject('failed to save download info!');
						reject(new TorrentError('failed to save download info!'));
					}
				});
			});
		});

		engine.on('download', () => {
			console.log(`Downloading...`);
			if (file) {
				const ratio = (engine.swarm.downloaded / file.length) * 100;
				console.log(`downloaded ${(ratio.toFixed(0))}% (${convertBytes(engine.swarm.downloaded)} from ${convertBytes(file?.length)} bytes)`);
				if (!resolved) {
					resolved = true;
					resolve(file);
				}
			}
		});

		engine.on('idle', () => {
			engine.destroy(() => {
				if (file && engine.swarm.downloaded >= file.length) {
					console.log('All files downloaded');
					//would be good to make generic function to take function and retry them returning error on reject or function return on resolve
					setDownloadComplete(imdb, quality)
						.catch((err) => console.log(`Download completion update failed:\n${getErrorMessage(err)}\n Trying update competion again...`))
						.then(() => setDownloadComplete(imdb, quality))
						.catch((err) => console.log(`Download completion update failed again:\n${getErrorMessage(err)}\n`));
				} else {
					console.log('idle state, files are not downloaded');
					console.log('initiate auto destruction');
					if (!resolved) {
						resolved = true;
						reject(new TorrentError('autodistruction'));
					}
				}
				console.log('Engine connection destroyed');
			});
		});
		// void imdb, quality;
	});
};
