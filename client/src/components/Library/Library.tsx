import { Alert, Container, Grid, Card } from '@mui/material';
import { useServiceCall } from '../../hooks/useServiceCall';
import { MovieThumbnail } from '../../types';
import libraryService from '../../services/library';
import withAuthRequired from '../AuthRequired';
import LoadingIcon from '../LoadingIcon';
import Thumbnail from './Thumbnail';

const center = { justifyContent: 'center' };
const height = { height: '208px' };

const Library = () => {
	const {
		data: movies,
		error
	}: { data: MovieThumbnail[] | undefined; error: Error | undefined } = useServiceCall(
		async () => await libraryService.getInitialMovies(),
		[]
	);

	if (error) return <Alert severity="error">Error loading page, please try again...</Alert>;
	if (!movies) return <LoadingIcon />;

	return (
		<Container maxWidth={'xl'} sx={{ pt: 5 }}>
			<Grid container gap={2} sx={center}>
				{movies.map((movie, id) => {
					return (
						<Card key={id} sx={height}>
							<Thumbnail movie={movie} />
						</Card>
					);
				})}
			</Grid>
		</Container>
	);
};

export default withAuthRequired(Library);
