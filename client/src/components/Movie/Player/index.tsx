import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import React, { useEffect, useState } from 'react';
import subtitleService from '../../../services/subtitles';
import streamService from '../../../services/stream';
import LoadingIcon from '../../LoadingIcon';
import { StreamStatus, SubtitleTrack } from '../../../types';
// import { reducer, INITIAL_STATE } from './Player.reducer';
import { useServiceCall } from '../../../hooks/useServiceCall';
import { useStateValue } from '../../../state';
import { styled } from '@mui/material';

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
	// const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
	const [subtitles, setSubtitles] = useState<SubtitleTrack[]>([]);
	const [{ loggedUser }] = useStateValue();
	// const playerRef = React.useRef<ReactPlayer>(null);
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	// console.log(playerRef);
	void light;
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
	} = useServiceCall(
		async () => await subtitleService.getMovieSubtitles(imdbCode, loggedUser?.language || 'enUS'),
		[]
	);

	useEffect(() => {
		if (subtitlesError) setSubtitles([]);
		else subtitlesData && setSubtitles(subtitlesData);
	}, [subtitlesData, subtitlesError]);

	// const handlePreview = () => {
	// 	dispatch({ type: 'TOGGLE_PLAY' });
	// 	dispatch({ type: 'LIGHT', payload: false });
	// };

	// const handlePause = () => {
	// 	dispatch({ type: 'PAUSE' });
	// };

	// const handlePlay = () => {
	// 	dispatch({ type: 'PLAY' });
	// };

	// const handleEnded = () => {
	// 	dispatch({ type: 'LIGHT', payload: true });
	// 	playerRef.current?.showPreview();
	// };

	// const handleProgress = (progress: { playedSeconds: number }) => {
	// 	dispatch({ type: 'SEEK', payload: progress.playedSeconds });
	// };

	// const handleDuration = (duration: number) => {
	// 	dispatch({ type: 'DURATION', payload: duration });
	// };

	// const onError = () => {
	// 	console.log('error');
	// }

	if (streamStatusError) console.log('Stream status error, try again.');
	if (streamStatusData) console.log(`${streamStatusData.progress}`);

	return (
		// <PlayerWrapper state={state} ref={wrapperRef}>
		<PlayerWrapper ref={wrapperRef}>
			{streamStatusLoading ? (
				<LoadingIconWrapper>
					<LoadingIcon />
				</LoadingIconWrapper>
			) : (
				<ReactPlayer
					url={`http://localhost:3001/api/stream/${imdbCode}/${quality}`}
					width="100%"
					height="100%"
					// light={false}
					style={{ position: 'relative' }}
					// ref={playerRef}
					playIcon={
						<PlayCircleOutlineRoundedIcon
							sx={{
								color: 'white',
								fontSize: '6rem'
							}}
						/>
					}
					// controls={state.controls}
					// loop={state.loop}
					// muted={state.muted}
					// playing={state.playing}
					// playbackRate={state.playbackRate}
					// volume={state.volume}
					// onPlay={handlePlay}
					// onEnded={handleEnded}
					// onPause={handlePause}
					// onDuration={handleDuration}
					// onProgress={handleProgress}
					// onClickPreview={handlePreview}
					// // onSeek={()=> console.log('seek')}
					// onError={onError}
					// controls={true}
					// playing={true}
					// muted={true}
					autoPlay={true}
					playing
					controls
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
