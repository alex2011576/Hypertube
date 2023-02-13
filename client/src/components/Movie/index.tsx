import { Alert, Box, Container, styled, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useServiceCall } from '../../hooks/useServiceCall';
import { YtsMovieData } from '../../types';
import withAuthRequired from '../AuthRequired';
import movieService from '../../services/movie';
import LoadingIcon from '../LoadingIcon';
import Text from '../Text';
import moviePlaceholder from './moviePlaceholder.png';

// import { Navigate } from 'react-router';

const Background = styled('div', {
	shouldForwardProp: (prop) => prop !== 'src'
})<{ src?: string; isWatched?: boolean }>(({ src }) => ({
	position: 'relative',
	bottom: '1rem',
	height: '100vw',
	width: '100%',
	backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.9150253851540616) 0%, rgba(0,0,0,0.9038209033613446) 18%, rgba(0,0,0,0.42) 100%), url(${src})`
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
	align-items: flex-start;
`;

const MoviePage = () => {
	const { id: movieId } = useParams();
	// if (!movieId) return <Navigate to="/" />;
	console.log('movieIdParam: ', movieId);
	const {
		data: movieData,
		error: movieError
	}: {
		data: YtsMovieData | undefined;
		error: Error | undefined;
	} = useServiceCall(async () => await movieService.getMovie(movieId), []);

	if (movieError)
		return (
			<Alert severity="error">
				<Text tid="moviesError" />
			</Alert>
		);
	if (!movieData) return <LoadingIcon />;

	const title = movieData.title.length ? movieData.title : 'No title';
	const year = movieData.year > 0 ? movieData.year : '';
	const summary = movieData.summary.length ? movieData.summary : '';
	const cover = movieData.cover.length ? movieData.cover : moviePlaceholder;
	const rating = movieData.rating > 0 ? '⭑ ' + movieData.rating : '';
	const isWatched = movieData.isWatched;
	const titleEnglish = movieData.titleEnglish || '';
	const synopsis = movieData.descriptionIntro.length ? movieData.descriptionIntro : '';
	const runtime = movieData.runtime > 0 ? movieData.runtime : '';
	const genres = movieData.genres.length ? movieData.genres : [''];
	const downloadCount = movieData.downloadCount > 0 ? movieData.downloadCount : '';
	const likeCount = movieData.likeCount > 0 ? movieData.likeCount : '';
	const language = movieData.language.length ? movieData.language : '';
	const background = movieData.cover.length
		? movieData.largeScreenshotImage
		: moviePlaceholder;

	return (
		<Background src={background}>
			<HeaderWrapper>
				<Typography variant="h5" color={'white'} sx={{ fontWeight: 700 }}>
					{titleEnglish.toUpperCase()}
				</Typography>
				<Typography color={'white'} sx={{ fontWeight: 600 }}>
					{title === titleEnglish ? '' : title.toUpperCase()}
				</Typography>
				<Typography variant="h6" color={'white'}>
					{year}
				</Typography>
				<Row>
					<Typography color={'text.disabled'} mr={1}>
						{rating}
					</Typography>
					<Typography color={'text.disabled'}>{genres[0]}</Typography>
					<Typography color={'text.secondary'} ml={1}>
						{' '}
						{language.toUpperCase()}
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
