import { Alert, Box, Container, styled, Tooltip, Typography } from '@mui/material';
import { useServiceCall } from '../../hooks/useServiceCall';
import { useParams } from 'react-router-dom';
import { MovieData } from '../../types';
import withAuthRequired from '../AuthRequired';
import movieService from '../../services/movie';
import LoadingIcon from '../LoadingIcon';
import Text from '../Text';
import moviePlaceholder from './moviePlaceholder.png';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Player from './Player';
// import { Navigate } from 'react-router';

const Background = styled('div', {
	shouldForwardProp: (prop) => prop !== 'src'
})<{ src?: string; isWatched?: boolean }>(({ src }) => ({
	position: 'relative',
	height: '100vh',
	width: '100%',
	minWidth: '320px',
	backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.9150253851540616) 0%, rgba(0,0,0,0.9038209033613446) 18%, rgba(0,0,0,0.42) 100%), url(${src})`,
	display: 'flex',
	flexDirection: 'column',
	paddingBottom: '4rem'
}));

const InfoContainer = styled(Container)`
	display: flex;
	flex-direction: column;
	padding: 0;
	margin: 0;
	${(props) => props.theme.breakpoints.up('md')} {
		flex-direction: row;
	}
`;

const InfoColumn = styled(Container)`
	padding-top: 24px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-width: 280px;
	text-align: left;
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
	margin: 1rem 0;
`;

const stringOrPlaceholder = (value: string | undefined, placeholder: string): string => {
	return value?.length && value !== 'N/A' ? value : placeholder;
};

const numberOrUndefined = (value: number): number | undefined => {
	return value && value > 0 ? value : undefined;
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

	const title = stringOrPlaceholder(yts.title, 'No title');
	const year = numberOrUndefined(yts.year);
	const cover = stringOrPlaceholder(yts.cover, moviePlaceholder);
	const rating = numberOrUndefined(yts.rating);
	// const isWatched = yts.isWatched;
	const titleEnglish = stringOrPlaceholder(yts.titleEnglish, '');
	const runtime = numberOrUndefined(yts.runtime);
	const genres = yts.genres.length ? yts.genres : [''];
	const downloadCount = numberOrUndefined(yts.downloadCount);
	const likeCount = numberOrUndefined(yts.likeCount);
	const language = stringOrPlaceholder(yts.language, '');
	const pageBackground = stringOrPlaceholder(yts.largeScreenshotImage, moviePlaceholder);
	const playerBackground = stringOrPlaceholder(yts.backgroundImage, moviePlaceholder);

	const plot = stringOrPlaceholder(omdb?.plot, '');
	const director = stringOrPlaceholder(omdb?.director, '');
	const writer = stringOrPlaceholder(omdb?.writer, '');
	const actors = stringOrPlaceholder(omdb?.actors, '');
	const country = stringOrPlaceholder(omdb?.country, '');

	return (
		<Background src={pageBackground}>
			<Player light={pageBackground || cover} background={playerBackground} />
			<InfoContainer>
				<InfoColumn>
					<Title>
						<Row>
							<Typography variant="h5" color={'white'} sx={{ fontWeight: 700 }}>
								{titleEnglish.toUpperCase()}
							</Typography>
							{rating && (
								<Box sx={{ display: 'flex', height: '100%' }}>
									<Typography variant="h6" color={'text.disabled'} ml={1}>
										⭑
									</Typography>
									<Typography variant="h6" color={'secondary'}>
										<strong>{rating}</strong>/10
									</Typography>
								</Box>
							)}
							<Box sx={{ display: 'flex', height: '100%', pt: '4px' }}>
								<Tooltip
									title={`${downloadCount} downloads; ${likeCount} like(s)`}
								>
									<InfoOutlinedIcon color={'primary'} sx={{ ml: 2 }} />
								</Tooltip>
							</Box>
						</Row>
					</Title>
					<Typography color={'white'} sx={{ fontWeight: 600 }}>
						{title === titleEnglish ? '' : title.toUpperCase()}
					</Typography>
					<Row>
						{country && (
							<Typography color={'text.disabled'} mr={1}>
								{country + (year && country && ',')}
							</Typography>
						)}
						<Typography color={'white'}>{year}</Typography>
					</Row>
					<Row>
						{runtime && (
							<Typography
								color={'text.disabled'}
								sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
							>
								<WatchLaterIcon fontSize="small" sx={{ mr: '5px' }} />{' '}
								{runtime}
							</Typography>
						)}
						<Typography color={'text.secondary'} mr={1}>
							{language.toUpperCase()}
						</Typography>
						<Typography color={'text.disabled'}>{genres[0]}</Typography>
					</Row>
					<Creators>
						{director.length > 3 && (
							<Typography color={'text.disabled'}>
								Directed by: <strong>{director}</strong> {/*TID!*/}
							</Typography>
						)}
						{writer.length > 3 && (
							<Typography color={'text.disabled'}>
								Written by: <strong>{writer}</strong> {/*TID!*/}
							</Typography>
						)}
						{actors.length > 3 && (
							<Box>
								<Typography color={'text.disabled'}>
									Cast: <strong>{actors}</strong>
									{/*TID!*/}
								</Typography>
							</Box>
						)}
					</Creators>
				</InfoColumn>
				{plot.length > 3 && (
					// <InfoColumn sx={{ width: '42%' }}>
					<InfoColumn>
						<Typography variant="h6" color={'white'}>
							PLOT {/*TID!*/}
						</Typography>
						<Typography color={'text.secondary'} textAlign={'left'}>
							{plot}
						</Typography>
					</InfoColumn>
				)}
			</InfoContainer>
		</Background>
	);
};

export default withAuthRequired(MoviePage);
