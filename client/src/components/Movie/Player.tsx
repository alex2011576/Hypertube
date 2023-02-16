import React from 'react';
import PlayerControls from './PlayerControls';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { reducer, INITIAL_STATE } from './Player.reducer';
import { styled } from '@mui/material';

import { useServiceCall } from '../../hooks/useServiceCall';
import streamService from '../../services/stream';
import { StreamStatus } from '../../types';
import LoadingIcon from '../LoadingIcon';

const PlayerWrapper = styled('div')<ReactPlayerProps>`
	position: relative;
	height: 65%;
`;
//should be getting imdb and quality here? 
const Player: React.FC<ReactPlayerProps> = (props) => {
	const { light, background } = props;
	const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
	const playerRef = React.useRef<ReactPlayer>(null);
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	console.log(state);

	const {
		data: movieData,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		error: movieError,
		loading
	}: {
		data?: StreamStatus;
		error?: Error;
		loading: boolean;
	} = useServiceCall(
		async () => await streamService.getMovieStatus('tt2386490', '1080p'),
		[]
	);

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

	if(movieData) console.log(`${movieData.progress}`);	

	return (
		<PlayerWrapper state={state} ref={wrapperRef} sx={{ backgroundImage: background }}>
			{loading ? (
				 <LoadingIcon />
			) : (
				<ReactPlayer
					url={`http://localhost:3001/api/stream/tt2386490/1080p`}
					// url={``}
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
				/>
			)}
			{!state.controls && !state.light && (
				<PlayerControls
					state={state}
					dispatch={dispatch}
					playerRef={playerRef}
					wrapperRef={wrapperRef}
				/>
			)}
		</PlayerWrapper>
	);
};

export default Player;
