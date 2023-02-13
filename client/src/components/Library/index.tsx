import { Alert, Container, Grid, Card, Box } from '@mui/material';
import { useServiceCall } from '../../hooks/useServiceCall';
import { MovieThumbnail } from '../../types';
import libraryService from '../../services/library';
import withAuthRequired from '../AuthRequired';
import LoadingIcon from '../LoadingIcon';
import Thumbnail from './Thumbnail';
import { useCallback, useEffect, useRef, useState } from 'react';
import SearchField from './SearchField';
import Text from '../Text';

const wrapperStyle = {
	pt: 3,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
};

const cardHeight = { height: '208px' };
const centeredGrid = { justifyContent: 'center', pt: 5 };

const Library = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [thumbnails, setThumbnails] = useState<MovieThumbnail[]>([]);
	const [queryTerm, setQueryTerm] = useState<string>('');

	const {
		data: moviesData,
		error: moviesError,
		loading: isLoading
	}: {
		data: MovieThumbnail[] | undefined;
		error: Error | undefined;
		loading: boolean;
	} = useServiceCall(
		async () => await libraryService.getInitialMovies(queryTerm, pageNumber, 20),
		[pageNumber, queryTerm]
	);

	const handleOnChange = () => {
		setPageNumber(1);
		setThumbnails([]);
	};

	const observer = useRef<IntersectionObserver | null>(null);
	const lastDisplayedMovieRef = useCallback(
		(node: Element) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore]
	);

	useEffect(() => {
		if (moviesData) {
			if (moviesData.length === 0) {
				setHasMore(false);
			} else {
				setThumbnails((prevThumbnails) => {
					const arrTemp = [...prevThumbnails, ...moviesData];
					return arrTemp.filter(
						(value, index, self) =>
							index === self.findIndex((movie) => movie.id === value.id)
					);
				});
				setHasMore(moviesData.length > 0);
			}
		}
	}, [moviesData, setThumbnails]);

	if (moviesError) return <Alert severity="error"><Text tid='libraryError' /></Alert>;
	if (!moviesData) return <LoadingIcon />;

	return (
		<Container maxWidth={'xl'} sx={wrapperStyle}>
			<SearchField
				setQueryTerm={setQueryTerm}
				queryTerm={queryTerm}
				handleOnChange={handleOnChange}
			/>
			<Grid container gap={2} sx={centeredGrid}>
				{thumbnails.map((movie, i) => (
					<Box
						key={i}
						{...(thumbnails.length === i + 1
							? { ref: lastDisplayedMovieRef }
							: {})}
					>
						<Card sx={cardHeight}>
							<Thumbnail movie={movie} />
						</Card>
					</Box>
				))}
			</Grid>
		</Container>
	);
};

export default withAuthRequired(Library);
