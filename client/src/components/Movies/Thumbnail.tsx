import { Card, CardActionArea, Chip, styled, Typography } from '@mui/material';
import { MovieThumbnail } from '../../types';
import { Link } from 'react-router-dom';
import moviePlaceholder from './moviePlaceholder.png';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { stringOrPlaceholder, numberOrUndefined } from '../../utils/helpers';

const Background = styled('div', {
	shouldForwardProp: (prop) => prop !== 'isWatched'
})<{ src?: string; isWatched?: boolean }>(({ src, isWatched }) => ({
	position: 'relative',
	height: '208px',
	width: '100%',
	backgroundImage: isWatched
		? `linear-gradient(0deg, rgba(0,0,0,0.9150253851540616) 0%, rgba(0,0,0,0.9038209033613446) 18%, rgba(0,20,137,0.42) 100%), url(${src})`
		: `linear-gradient(0deg, rgba(0,0,0,0.9150253851540616) 0%, rgba(0,0,0,0.9038209033613446) 18%, rgba(255,255,255,0) 100%), url(${src})`
}));

const ChipPosition = styled('div')({
	display: 'flex',
	alignItems: 'flex-start',
	justifyContent: 'flex-end'
});

const AbsoluteContent = styled('div')`
	position: absolute;
	color: white;
	bottom: 10px;
	text-align: left;
	padding: 10px;
`;

const Thumbnail = ({ movie }: { movie: MovieThumbnail }) => {
	const cover = stringOrPlaceholder(movie.cover, moviePlaceholder);
	const title = stringOrPlaceholder(movie.title, 'No title');
	const year = numberOrUndefined(movie.year);
	const rating = numberOrUndefined(movie.rating) ? movie.rating + ' ⭑' : '';
	const summary = movie.summary.length ? movie.summary.slice(0, 85) + '...' : '';

	return (
		<Card sx={{ width: { xs: 300, sm: 320, md: 370 } }}>
			<Link to={`/movies/${movie.id}`}>
				<CardActionArea>
					<Background src={cover} isWatched={movie.isWatched}>
						{movie.isWatched && (
							<ChipPosition>
								<Chip
									icon={<VisibilityRoundedIcon />}
									label="WATCHED"
									color="primary"
									sx={{ alignItems: 'center', m: 1 }}
								/>
							</ChipPosition>
						)}
						<AbsoluteContent>
							<Typography variant="h5">{title}</Typography>
							<Typography variant="subtitle1">{year + ' ' + rating}</Typography>
							<Typography variant="body2">{summary}</Typography>
						</AbsoluteContent>
					</Background>
				</CardActionArea>
			</Link>
		</Card>
	);
};

export default Thumbnail;
