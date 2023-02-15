import React from 'react';
import PlayerControls from './PlayerControls';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { reducer, INITIAL_STATE } from './Player.reducer';
import { styled } from '@mui/material';

import url from './test.mp4'; //rm later

const PlayerWrapper = styled('div')<ReactPlayerProps>`
	position: relative;
	height: 65%;
`;

const Player: React.FC<ReactPlayerProps> = (props) => {
	const { light, background } = props;
	const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
	const playerRef = React.useRef<ReactPlayer>(null);
	const wrapperRef = React.useRef<HTMLDivElement>(null);
	console.log(state);

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

	return (
		<PlayerWrapper state={state} ref={wrapperRef} sx={{ backgroundImage: background }}>
			<ReactPlayer
				url={url}
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
