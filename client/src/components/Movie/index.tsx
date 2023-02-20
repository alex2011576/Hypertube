import { useToggleButtonWithSetValue } from '../../hooks/useToggleButton';
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
import Quality from './Quality';
import Player from './Player';
import { useState } from 'react';
import PrePlayer from './Player/PrePlayer';

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
	const quality = useToggleButtonWithSetValue(undefined);
	const [loadingPlayer, setLoadingPlayer] = useState(false);

	const {
		data: movieData,
		error: movieError
	}: {
		data: MovieData | undefined;
		error: Error | undefined;
	} = useServiceCall(async () => movieId && (await movieService.getMovie(movieId)), []);

	if (movieError) return <Navigate to="/" />;
	if (!movieData) return <LoadingIcon />;

	const { ytsMovieData: yts } = movieData;

	const torrents = yts.torrents;
	const pageBackground = stringOrPlaceholder(yts.largeScreenshotImage, moviePlaceholder);

	return (
		<Background src={pageBackground}>
			{!loadingPlayer ? (
				<PrePlayer playHandle={() => setLoadingPlayer(true)}></PrePlayer>
			) : (
				<Player
					imdbCode={yts.imdbCode}
					quality={quality.value || torrents[0].quality}
					light={pageBackground}
				/>
			)}
			<Quality torrents={torrents} quality={quality} playHandle={() => setLoadingPlayer(false)}/>
			<MovieInfo movieData={movieData} />
			<Reviews movieId={yts.id} />
		</Background>
	);
};

export default withAuthRequired(MoviePage);
