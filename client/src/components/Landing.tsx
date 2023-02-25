import { styled, Typography } from '@mui/material';
import bg from '../bg.jpg';

const Background = styled('div', {
	shouldForwardProp: (prop) => prop !== 'src'
})<{ src?: string }>(({ src }) => ({
	position: 'relative',
	height: '120vw',
	width: '100%',
	minWidth: '320px',
	backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.9150253851540616) 0%, rgba(0,0,0,0.9038209033613446) 18%, rgba(0,0,0,0.42) 100%), url(${src})`,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
	backgroundPosition: 'center',
	backgroundRepeat: 'repeat',
	backgroundAttachment: 'fixed',
	bottom: '64px'
}));

const Landing = () => {
	return (
		<Background src={bg}>
			<Typography
				color={'secondary'}
				sx={{
					minWidth: '320px',
					textAlign: 'left',
					padding: {
						xs: '30% 2rem',
						sm: '15% 5rem',
						md: '10% 5rem',
						lg: '7% 6rem'
					},
					fontWeight: '500!important',
					typography: { xs: 'h3', sm: 'h2', md: 'h1', lg: 'h1' }
				}}
			>
				WATCH <br /> GREAT <br />
				CINEMA <br /> WITH <br /> HYPERTUBE
			</Typography>
		</Background>
	);
};

export default Landing;
