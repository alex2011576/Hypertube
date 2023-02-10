import { Card, CardActionArea, styled, Typography } from '@mui/material';
import { MovieThumbnail } from '../../types';
import moviePlaceholder from './moviePlaceholder.png';

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
	const cover = movie.cover.length ? movie.cover : moviePlaceholder;
	const title = movie.title.length ? movie.title : 'No title';
	const year = movie.year > 0 ? movie.year : '';
	const rating = movie.rating > 0 ? movie.rating + ' ⭑' : '';
	const summary = movie.summary.length ? movie.summary.slice(0, 85) + '...' : '';

	return (
		<Card sx={{ width: 370 }}>
			<CardActionArea>
				<Background src={cover}>
					<AbsoluteContent>
						<Typography variant="h5">{title}</Typography>
						<Typography variant="subtitle1">{year + ' ' + rating}</Typography>
						<Typography variant="body2">{summary}</Typography>
					</AbsoluteContent>
				</Background>
			</CardActionArea>
		</Card>
	);
};

export default Thumbnail;