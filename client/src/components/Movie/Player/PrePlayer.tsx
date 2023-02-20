import { ReactPlayerProps } from 'react-player';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import { styled } from '@mui/material';


const PlayerWrapper = styled('div')<ReactPlayerProps>`
	position: relative;
	height: 520px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PrePlayer = ({playHandle} : {playHandle: () => void}) => {

    return (
        <PlayerWrapper>
            <PlayCircleOutlineRoundedIcon
                            onClick = {playHandle}
							sx={{
								color: 'white',
								fontSize: '6rem',
							}}
						/>
        </PlayerWrapper>
    );
};

export default PrePlayer;