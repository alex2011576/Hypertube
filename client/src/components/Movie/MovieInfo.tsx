import { Box, Container, styled, Tooltip, Typography } from '@mui/material';
import { stringOrPlaceholder, numberOrUndefined } from '../../utils/helpers';
import { useServiceCall } from '../../hooks/useServiceCall';
import { useStateValue } from '../../state';
import { MovieData } from '../../types';
import { translate } from '../../services/translate';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

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

const MovieInfo = ({ movieData }: { movieData: MovieData }) => {
	const { ytsMovieData: yts, omdbMovieData: omdb } = movieData;

	const title = stringOrPlaceholder(yts.title, 'No title');
	const year = numberOrUndefined(yts.year);
	const rating = numberOrUndefined(yts.rating);
	// const isWatched = yts.isWatched;
	const titleEnglish = stringOrPlaceholder(yts.titleEnglish, '');
	const runtime = numberOrUndefined(yts.runtime);
	const genres = yts.genres.length ? yts.genres : [''];
	const downloadCount = numberOrUndefined(yts.downloadCount);
	const likeCount = numberOrUndefined(yts.likeCount);
	const language = stringOrPlaceholder(yts.language, '');

	const plot = stringOrPlaceholder(omdb?.plot, '');
	const director = stringOrPlaceholder(omdb?.director, '');
	const writer = stringOrPlaceholder(omdb?.writer, '');
	const actors = stringOrPlaceholder(omdb?.actors, '');
	const country = stringOrPlaceholder(omdb?.country, '');

	const [{ loggedUser }] = useStateValue();

	const targetLanguage = loggedUser && loggedUser.language.substring(0, 2);

	const {
		data: titleTranslation,
		error: titleTranslationError
	}: {
		data: string | undefined;
		error: Error | undefined;
	} = useServiceCall(async () => await translate(title, targetLanguage), []);

	const {
		data: countryTranslation,
		error: countryTranslationError
	}: {
		data: string | undefined;
		error: Error | undefined;
	} = useServiceCall(async () => await translate(country, targetLanguage), []);

	const {
		data: plotTranslation,
		error: plotTranslationError
	}: {
		data: string | undefined;
		error: Error | undefined;
	} = useServiceCall(async () => await translate(plot, targetLanguage), []);

	const translatedTitle = titleTranslationError ? title : titleTranslation;
	const translatedPlot = plotTranslationError ? plot : plotTranslation;
	const translatedCountry =
		countryTranslationError || !countryTranslation ? country : countryTranslation;

	return (
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
					{translatedTitle === titleEnglish ? '' : translatedTitle?.toUpperCase()}
				</Typography>
				<Row>
					{country && (
						<Typography color={'text.disabled'} mr={1}>
							{translatedCountry + (year && translatedCountry && ',')}
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
							<WatchLaterIcon fontSize="small" sx={{ mr: '5px' }} /> {runtime}
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
						{translatedPlot}
					</Typography>
				</InfoColumn>
			)}
		</InfoContainer>
	);
};

export default MovieInfo;
