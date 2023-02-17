// import { useServiceCall } from '../../../hooks/useServiceCall';
import { ReviewType } from '../../../types';
import { Container, Typography, styled, Box, Grid, Pagination } from '@mui/material';
import Review from './Review';
import Text from '../../Text';
import ReviewForm from './ReviewForm';

const reviews: ReviewType[] = [
	{ text: 'good movie but too slow download', rating: 4, userId: '1', username: 'Ilona' },
	{
		text: 'more subtitle options would be great',
		rating: 3,
		userId: '1',
		username: 'Bebs'
	},
	{
		text: "300 eppe sswe wefwef wef wef wef wef weffwewww just want to leave a comment and a longer one! because why not and what you gonna do I'm from another city, sorry for swearing just want to leave a comment and a longer one! because why not and what you gonna do I'm from another city, sorry for swearing",
		rating: 5,
		userId: '1',
		username: 'Not-Ilona'
	},
	{ text: 'good movie but too slow download', rating: 4, userId: '1', username: 'Ilona' },
	{
		text: 'more subtitle options would be great',
		rating: 3,
		userId: '1',
		username: 'Bebs'
	},
	{
		text: "300 eppe sswe wefwef wef wef wef wef weffwewww just want to leave a comment and a longer one! because why not and what you gonna do I'm from another city, sorry for swearing just want to leave a comment and a longer one! because why not and what you gonna do I'm from another city, sorry for swearing",
		rating: 5,
		userId: '1',
		username: 'Not-Ilona'
	},
	{ text: 'good movie but too slow download', rating: 4, userId: '1', username: 'Ilona' },
	{
		text: "300 eppe sswe kekekeekek a longer one! because why not and what you gonna do I'm from another city, sorry for swearing just want to leave a comment and a longer one! because why not and what you gonna do I'm from another city, sorry for swearing",
		rating: 5,
		userId: '1',
		username: 'Not-Ilona'
	}
];

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
	// const {
	// 	data: reviewData,
	// 	error: reviewError
	// }: {
	// 	data: ReviewType[] | undefined;
	// 	error: Error | undefined;
	// } = useServiceCall(async () => await movieService.getReviews(movieId), []);

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
				count={50}
				color="primary"
				size="small"
				sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}
			/>
			<ReviewForm />
		</ReviewsContainer>
	);
};

export default Reviews;
