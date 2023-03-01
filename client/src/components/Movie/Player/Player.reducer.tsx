import { ReactPlayerProps } from 'react-player';

interface CustmoPlayerProps extends ReactPlayerProps {
	progress?: {
		playedSeconds: number
	},
  }
const INITIAL_STATE: CustmoPlayerProps = {
	playing: true,
	controls: true,
	volume: 0.8,
	light: false,
	progress: {
		playedSeconds: 0
	},
	duration: 0,
};

const reducer = (state: CustmoPlayerProps, action: CustmoPlayerProps) => {
	switch (action.type) {
		case 'PLAY':
			return { ...state, playing: true, controls: true };
		case 'PAUSE':
			return { ...state, playing: false, controls: true };
		case 'TOGGLE_PLAY':
			return { ...state, playing: !state.playing };
		case 'DURATION':
			return { ...state, duration: action.payload };
		case 'SEEK':
			return { ...state, progress: { playedSeconds: action.payload } };
		case 'VOLUME':
			return { ...state, volume: action.payload };
		case 'LIGHT':
			return { ...state, light: action.payload };
		default:
			return state;
	}
};

export { reducer, INITIAL_STATE };
