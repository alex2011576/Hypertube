import { stringOrPlaceholder } from '../../utils/helpers';
import { useServiceCall } from '../../hooks/useServiceCall';
import { useParams } from 'react-router-dom';
import { MovieData } from '../../types';
import { Navigate } from 'react-router';
import { styled } from '@mui/material';
import moviePlaceholder from './moviePlaceholder.png';
import withAuthRequired from '../AuthRequired';
import movieService from '../../services/movie';
import LoadingIcon from '../LoadingIcon';
import MovieInfo from './MovieInfo';
import Reviews from './Reviews/';
import Player from './Player';
// import Text from '../Text';

const Background = styled('div', {
	shouldForwardProp: (prop) => prop !== 'src'
})<{ src?: string }>(({ src }) => ({
	position: 'relative',
	height: 'fit-content',
	width: '100%',
	minWidth: '320px',
	backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.9150253851540616) 0%, rgba(0,0,0,0.9038209033613446) 18%, rgba(0,0,0,0.42) 100%), url(${src})`,
	display: 'flex',
	flexDirection: 'column',
	paddingBottom: '4rem'
}));

const MoviePage = () => {
	const { id: movieId } = useParams();

	const {
		data: movieData,
		error: movieError
	}: {
		data: MovieData | undefined;
		error: Error | undefined;
	} = useServiceCall(async () => movieId && (await movieService.getMovie(movieId)), []);

	if (movieError) return <Navigate to="/" />;
	if (!movieData) return <LoadingIcon />;

	const { ytsMovieData: yts, /* movieData.reviewPagesCount: pagesCount */ } = movieData;
	const pageBackground = stringOrPlaceholder(yts.largeScreenshotImage, moviePlaceholder);
	const cover = stringOrPlaceholder(yts.cover, moviePlaceholder);

	const torrents = yts.torrents;

	return (
		<Background src={pageBackground}>
			<Player
				light={pageBackground || cover}
				id={yts.imdbCode}
				quality={torrents[0].quality}
			/>
			<MovieInfo movieData={movieData} />
			<Reviews movieId={yts.id} pagesCount={10 /*pagesCount*/} />
		</Background>
	);
};

export default withAuthRequired(MoviePage);
