import { Alert, Container, Grid, Card, Box, styled, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MovieThumbnail, SearchQuery } from '../../types';
import { useServiceCall } from '../../hooks/useServiceCall';
import moviesService from '../../services/movies';
import withAuthRequired from '../AuthRequired';
import LoadingIcon from '../LoadingIcon';
import SearchField from './SearchField';
import Thumbnail from './Thumbnail';
import Text from '../Text';

const centeredGrid = { justifyContent: 'center', pt: 5 };
const cardHeight = { height: '208px' };

const Wrapper = styled(Container)`
	padding-top: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Movies = () => {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [thumbnails, setThumbnails] = useState<MovieThumbnail[]>([]);

	const initialQuery = {
		queryTerm: '',
		genre: '',
		sortBy: 'download_count',
		reverseOrder: false
	};

	const [searchQuery, setSearchQuery] = useState<SearchQuery>(initialQuery);

	const {
		data: moviesData,
		error: moviesError,
		loading: isLoading
	}: {
		data: MovieThumbnail[] | undefined;
		error: Error | undefined;
		loading: boolean;
	} = useServiceCall(
		async () => await moviesService.getMovies(searchQuery, pageNumber, 20),
		[pageNumber, searchQuery]
	);

	const handleOnChange = () => {
		setPageNumber(1);
		setThumbnails([]);
	};

	const setSearchQueryAndReset = (searchQuery: SearchQuery) => {
		handleOnChange();
		setSearchQuery(searchQuery);
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
			if (!moviesData.length) {
				setHasMore(false);
			} else if (pageNumber === 1 && hasMore) {
				setThumbnails(moviesData);
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasMore, moviesData, setThumbnails]);

	if (moviesError)
		return (
			<Alert severity="error">
				<Text tid="moviesError" />
			</Alert>
		);
	if (!moviesData) return <LoadingIcon />;

	return (
		<Wrapper maxWidth={'xl'}>
			<SearchField searchQuery={searchQuery} setSearchQuery={setSearchQueryAndReset} />
			{thumbnails.length ? (
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
			) : !thumbnails.length && !moviesData.length ? (
				<Container sx={{ height: '100vh' }}>
					<Typography variant="h5" sx={{ m: 10 }} color={'text.secondary'}>
						No movies found
					</Typography>
				</Container>
			) : (
				<LoadingIcon />
			)}
		</Wrapper>
	);
};

export default withAuthRequired(Movies);
