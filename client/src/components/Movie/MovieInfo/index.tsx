import { Container, styled } from '@mui/material';
import { stringOrPlaceholder, numberOrUndefined } from '../../../utils/helpers';
import { useStateValue } from '../../../state';
import { MovieData } from '../../../types';
import Creators from './Creators';
import Title from './Title';
import CountryAndYear from './CountryAndYear';
import RuntimeLanguageGenre from './RuntimeLanguageGenre';
import Plot from './Plot';

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

const MovieInfo = ({ movieData }: { movieData: MovieData }) => {
	const [{ loggedUser }] = useStateValue();
	const userLanguage = loggedUser?.language.substring(0, 2) || 'en';

	const {
		ytsMovieData: yts,
		omdbMovieData: omdb,
		translatedMovieData: translations
	} = movieData;

	const titleEnglish = stringOrPlaceholder(yts.titleEnglish, '');
	const rating = numberOrUndefined(yts.rating);
	const title = translations[userLanguage as keyof typeof translations].title || yts.title;
	const country =
		translations[userLanguage as keyof typeof translations].title || omdb?.country || '';
	const year = numberOrUndefined(yts.year);

	const runtime = numberOrUndefined(yts.runtime);
	const language = stringOrPlaceholder(yts.language, '');
	const genre = translations[userLanguage as keyof typeof translations].genre || '';

	const downloadCount = numberOrUndefined(yts.downloadCount);
	const likeCount = numberOrUndefined(yts.likeCount);

	const director = stringOrPlaceholder(omdb?.director, '');
	const writer = stringOrPlaceholder(omdb?.writer, '');
	const actors = stringOrPlaceholder(omdb?.actors, '');

	const plot =
		translations[userLanguage as keyof typeof translations].plot || omdb?.plot || '';

	return (
		<InfoContainer>
			<InfoColumn>
				<Title
					titleEnglish={titleEnglish}
					rating={rating}
					downloadCount={downloadCount}
					likeCount={likeCount}
					title={title}
				/>

				<CountryAndYear country={country} year={year} />

				<RuntimeLanguageGenre runtime={runtime} language={language} genre={genre} />

				<Creators director={director} writer={writer} actors={actors} />
			</InfoColumn>
			<InfoColumn>
				<Plot plot={plot} />
			</InfoColumn>
		</InfoContainer>
	);
};

export default MovieInfo;
