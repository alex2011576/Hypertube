import { Card, CardActionArea, styled, Typography } from '@mui/material';
import { MovieThumbnail } from '../../types';

const Background = styled('div', {
	shouldForwardProp: (prop) => prop !== 'myProp'
})<{ src?: string }>(({ src }) => ({
	position: 'relative',
	height: '208px',
	width: '100%',
	backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.9150253851540616) 0%, rgba(0,0,0,0.9038209033613446) 18%, rgba(255,255,255,0) 100%), url(${src})`
}));

const AbsoluteContent = styled('div')`
	position: absolute;
	color: white;
	bottom: 10px;
	text-align: left;
	padding: 10px;
`;

const Thumbnail = ({ movie }: { movie: MovieThumbnail }) => {
	return (
		<Card sx={{ width: 370 }}>
			<CardActionArea>
				<Background src={movie.cover}>
					<AbsoluteContent>
						<Typography gutterBottom variant="h5" m={0}>
							{movie.title}
						</Typography>
						<Typography variant="subtitle1">
							{movie.year + ' ' + movie.rating + ' ⭑'}
						</Typography>
						<Typography variant="body2">
							{movie.summary.slice(0, 85) + '...'}
						</Typography>
					</AbsoluteContent>
				</Background>
			</CardActionArea>
		</Card>
	);
};

export default Thumbnail;
