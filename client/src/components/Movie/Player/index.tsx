import React, { useEffect, useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { reducer, INITIAL_STATE } from './Player.reducer';
import { styled } from '@mui/material';

import { useServiceCall } from '../../../hooks/useServiceCall';
import { StreamStatus, SubtitleTrack } from '../../../types';
import streamService from '../../../services/stream';
import subtitleService from '../../../services/subtitles';
import LoadingIcon from '../../LoadingIcon';
import { useStateValue } from '../../../state';

const PlayerWrapper = styled('div')<ReactPlayerProps>`
	position: relative;
	height: 520px;
`;

const LoadingIconWrapper = styled('div')<ReactPlayerProps>`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Player: React.FC<ReactPlayerProps> = (props) => {
	const { light, imdbCode, quality } = props;
	const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
	const playerRef = React.useRef<ReactPlayer>(null);
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	const [subtitles, setSubtitles] = useState<SubtitleTrack[]>([]);

	const [{ loggedUser }] = useStateValue();
	const targetLanguage = loggedUser?.language.substring(0, 2);

	const {
		data: streamStatusData,
		loading: streamStatusLoading,
		error: streamStatusError
	}: {
		data?: StreamStatus;
		error?: Error;
		loading: boolean;
	} = useServiceCall(
		async () => await streamService.getMovieStatus(imdbCode, quality),
		[quality]
	);

	const {
		data: subtitlesData,
		error: subtitlesError
	}: {
		data?: SubtitleTrack[];
		error?: Error;
	} = useServiceCall(async () => await subtitleService.getMovieSubtitles(imdbCode), []);

	useEffect(() => {
		if (subtitlesError) setSubtitles([]);
		else {
			const subsByLang =
				subtitlesData &&
				subtitlesData.find((subtitle) => subtitle.srcLang === targetLanguage);
			subsByLang && setSubtitles([subsByLang]);
		}
	}, [subtitlesData, subtitlesError, targetLanguage]);

	const handlePreview = () => {
		dispatch({ type: 'TOGGLE_PLAY' });
		dispatch({ type: 'LIGHT', payload: false });
	};

	const handlePause = () => {
		dispatch({ type: 'PAUSE' });
	};

	const handlePlay = () => {
		dispatch({ type: 'PLAY' });
	};

	const handleEnded = () => {
		dispatch({ type: 'LIGHT', payload: true });
		playerRef.current?.showPreview();
	};

	const handleProgress = (progress: { playedSeconds: number }) => {
		dispatch({ type: 'SEEK', payload: progress.playedSeconds });
	};

	const handleDuration = (duration: number) => {
		dispatch({ type: 'DURATION', payload: duration });
	};

	if (streamStatusError) console.log('Stream status error, try again.');
	if (streamStatusData) console.log(`${streamStatusData.progress}`);

	return (
		<PlayerWrapper state={state} ref={wrapperRef}>
			{streamStatusLoading ? (
				<LoadingIconWrapper>
					<LoadingIcon />
				</LoadingIconWrapper>
			) : (
				<ReactPlayer
					url={`http://localhost:3001/api/stream/${imdbCode}/${quality}`}
					width="100%"
					height="100%"
					light={light}
					style={{ position: 'relative' }}
					ref={playerRef}
					playIcon={
						<PlayCircleOutlineRoundedIcon
							sx={{
								color: 'white',
								fontSize: '6rem'
							}}
						/>
					}
					controls={state.controls}
					loop={state.loop}
					muted={state.muted}
					playing={state.playing}
					playbackRate={state.playbackRate}
					volume={state.volume}
					onPlay={handlePlay}
					onEnded={handleEnded}
					onPause={handlePause}
					onDuration={handleDuration}
					onProgress={handleProgress}
					onClickPreview={handlePreview}
					config={{
						file: {
							tracks: subtitles,
							attributes: { crossOrigin: 'true' }
						}
					}}
				/>
			)}
		</PlayerWrapper>
	);
};

export default Player;
