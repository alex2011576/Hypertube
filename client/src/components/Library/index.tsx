import { Alert, Container, Grid, Card, Box } from '@mui/material';
import { useServiceCall } from '../../hooks/useServiceCall';
import { MovieThumbnail } from '../../types';
import libraryService from '../../services/library';
import withAuthRequired from '../AuthRequired';
import LoadingIcon from '../LoadingIcon';
import Thumbnail from './Thumbnail';
import { useCallback, useEffect, useRef, useState } from 'react';

const center = { justifyContent: 'center' };
const height = { height: '208px' };

const Library = () => {
	const [pageNumber, setPageNumber] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [thumbnails, setThumbnails] = useState<MovieThumbnail[]>([]);

	const {
		data: moviesData,
		error: moviesError,
		loading: isLoading
	}: {
		data: MovieThumbnail[] | undefined;
		error: Error | undefined;
		loading: boolean;
	} = useServiceCall(
		async () => await libraryService.getInitialMovies(pageNumber, 20),
		[pageNumber]
	);

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

	if (moviesError) return <Alert severity="error">Error occurred, please try again</Alert>;
	if (!moviesData) return <LoadingIcon />;

	return (
		<Container maxWidth={'xl'} sx={{ pt: 5 }}>
			<Grid container gap={2} sx={center}>
				{thumbnails.map((movie, i) => (
					<Box
						key={i}
						{...(thumbnails.length === i + 1
							? { ref: lastDisplayedMovieRef }
							: {})}
					>
						<Card sx={height}>
							<Thumbnail movie={movie} />
						</Card>
					</Box>
				))}
			</Grid>
		</Container>
	);
};

export default withAuthRequired(Library);
