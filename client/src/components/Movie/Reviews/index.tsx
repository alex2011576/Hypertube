// import { useServiceCall } from '../../../hooks/useServiceCall';
// import { ReviewsAndTotalCount } from '../../../types';
import { Container, Typography, styled, Box, Grid, Pagination } from '@mui/material';
import Review from './Review';
import Text from '../../Text';
import ReviewForm from './ReviewForm';
import { dummyReviews as reviews } from './dummyReviews';
import { useState } from 'react';
//import LoadingIcon from '../../LoadingIcon';

const ReviewsBox = styled(Box)`
	display: flex;
	flex-grow: 1;
	justify-content: center;
`;

const ReviewsContainer = styled(Container)`
	margin: 0;
	min-width: 100%;
`;

const Reviews = ({ movieId }: { movieId: number }) => {
	const [page, setPage] = useState<number>(1);

	// const {
	// 	data: reviewData,
	// 	error: reviewError
	// }: {
	// 	data: ReviewsAndTotalCount, | undefined;
	// 	error: Error | undefined;
	// } = useServiceCall(async () => await movieService.getReviews(movieId, page), [page]);

	// if (!reviewError) return <></>;
	// if (!reviewData) return <LoadingIcon />;
	// const {reviews, totalCount} = reviewData;
	const totalCount = 15; //temp

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<ReviewsContainer sx={{ padding: { xs: '2rem 1rem', sm: '2rem 3rem' } }}>
			<Box sx={{ textAlign: 'left' }}>
				<Typography variant="h6" color={'white'} pb={2}>
					<Text tid="reviews" />
				</Typography>
			</Box>
			<ReviewsBox sx={{ flexGrow: 1 }}>
				<Grid container spacing={2} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}>
					{Array.from(reviews).map((review, index) => (
						<Grid item xs={2} sm={4} md={3} lg={3} key={index}>
							<Review review={review} />
						</Grid>
					))}
				</Grid>
			</ReviewsBox>
			<Pagination
				count={Math.ceil(totalCount / 8)}
				onChange={handlePageChange}
				color="primary"
				size="small"
				sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}
			/>
			<ReviewForm movieId={movieId} />
		</ReviewsContainer>
	);
};

export default Reviews;
