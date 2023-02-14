import { Alert, Box, Container, styled, Typography } from '@mui/material';
import { useServiceCall } from '../../hooks/useServiceCall';
import { useParams } from 'react-router-dom';
import { MovieData } from '../../types';
import withAuthRequired from '../AuthRequired';
import movieService from '../../services/movie';
import LoadingIcon from '../LoadingIcon';
import Text from '../Text';
import moviePlaceholder from './moviePlaceholder.png';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
// import { Navigate } from 'react-router';

const Background = styled('div', {
	shouldForwardProp: (prop) => prop !== 'src'
})<{ src?: string; isWatched?: boolean }>(({ src }) => ({
	position: 'relative',
	height: '100vh',
	width: '100%',
	backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.9150253851540616) 0%, rgba(0,0,0,0.9038209033613446) 18%, rgba(0,0,0,0.42) 100%), url(${src})`,
	display: 'flex',
	flexDirection: 'column'
}));

const HeaderWrapper = styled(Container)`
	margin: 0 2rem;
	padding-top: 24px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const Synopsis = styled(Container)`
	margin: 0 2rem;
	padding-top: 24px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const Row = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Title = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 1rem;
`;

const Creators = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 1rem;
`;

const stringOrEmptyString = (value: string | undefined, placeholder: string): string => {
	return value?.length ? value : placeholder;
};

const numberOrEmptyString = (value: number): string | number => {
	return value && value > 0 ? value : '';
};

const MoviePage = () => {
	const { id: movieId } = useParams();
	// if (!movieId) return <Navigate to="/" />;
	// console.log('movieIdParam: ', movieId);
	const {
		data: movieData,
		error: movieError
	}: {
		data: MovieData | undefined;
		error: Error | undefined;
	} = useServiceCall(async () => await movieService.getMovie(movieId), []);

	if (movieError)
		return (
			<Alert severity="error">
				<Text tid="moviesError" />
			</Alert>
		);
	if (!movieData) return <LoadingIcon />;

	const { ytsMovieData: yts, omdbMovieData: omdb } = movieData;

	const title = stringOrEmptyString(yts.title, 'No title');
	const year = numberOrEmptyString(yts.year);
	// const summary = stringOrEmptyString(yts.summary, '');
	// const cover = stringOrEmptyString(yts.cover, moviePlaceholder);
	const rating = yts.rating > 0 ? '⭑' + yts.rating : '';
	// const isWatched = yts.isWatched;
	const titleEnglish = stringOrEmptyString(yts.titleEnglish, '');
	const synopsis = stringOrEmptyString(yts.descriptionIntro, '');
	const runtime = numberOrEmptyString(yts.runtime);
	const genres = yts.genres.length ? yts.genres : [''];
	// const downloadCount = numberOrEmptyString(yts.downloadCount);
	// const likeCount = numberOrEmptyString(yts.likeCount);
	const language = stringOrEmptyString(yts.language, '');
	const background = stringOrEmptyString(yts.largeScreenshotImage, moviePlaceholder);

	const director = stringOrEmptyString(omdb?.director, '');
	const writer = stringOrEmptyString(omdb?.writer, '');
	// const actors = omdb?.actors.length ? omdb.actors : [''];
	const country = stringOrEmptyString(omdb?.country, '');
	// const awards = stringOrEmptyString(omdb?.awards, '');

	return (
		<Background src={background}>
			<HeaderWrapper>
				<Title>
					<Row>
						<Typography variant="h5" color={'white'} sx={{ fontWeight: 700 }}>
							{titleEnglish.toUpperCase()}
						</Typography>
						<Typography color={'text.disabled'} ml={1}>
							{rating}
						</Typography>
					</Row>
					<Typography color={'white'} sx={{ fontWeight: 600 }}>
						{title === titleEnglish ? '' : title.toUpperCase()}
					</Typography>
				</Title>
				<Creators>
					{director.length && (
						<Typography color={'text.disabled'}>
							Directed by: <strong>{director}</strong>
						</Typography>
					)}
					{writer.length && (
						<Typography color={'text.disabled'}>
							Written by: <strong>{writer}</strong>
						</Typography>
					)}
				</Creators>
				<Row>
					<Typography color={'text.disabled'} mr={1}>
						{country},
					</Typography>
					<Typography color={'white'}>{year}</Typography>
				</Row>
				<Row>
					{runtime && (
						<Typography
							color={'text.disabled'}
							sx={{ display: 'flex', alignItems: 'center' }}
						>
							<WatchLaterIcon fontSize="small" sx={{ mr: '3px' }} /> {runtime}
						</Typography>
					)}
					<Typography color={'text.secondary'} ml={1}>
						{language.toUpperCase()}
					</Typography>
					<Typography color={'text.disabled'} ml={1}>
						{genres[0]}
					</Typography>
				</Row>
			</HeaderWrapper>
			<Synopsis sx={{ width: '42%' }}>
				<Typography variant="h6" color={'white'}>
					SYNOPSIS {/*TID!*/}
				</Typography>
				<Typography color={'text.secondary'} textAlign={'left'}>
					{synopsis}
				</Typography>
			</Synopsis>
		</Background>
	);
};

export default withAuthRequired(MoviePage);
