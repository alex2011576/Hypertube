import { Paper, Typography, styled, Box, Rating, Avatar } from '@mui/material';
import { ReviewType } from '../../../types';
import { Link } from 'react-router-dom';
import placeholder from './profilePlaceholder.jpeg';
import theme from '../../../theme';

const Card = styled(Paper)(({ theme }) => ({
	height: '450px',
	backgroundColor: '#ffffff5e',
	padding: theme.spacing(2),
	textAlign: 'justify',
	color: theme.palette.text.secondary
}));

export const StyledLink = styled(Link)`
	text-decoration: none;
	color: white;
`;

export const ReviewHeader = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const StyledBox = styled(Box)`
	display: flex;
	flex-direction: column-reverse;
	align-items: flex-start;
	margin-left: 1rem;
`;

const Review = ({ review }: { review: ReviewType }) => {
	return (
		<Card theme={theme}>
			<ReviewHeader>
				<Avatar alt={review.username} src={placeholder} />
				<StyledBox>
					<Rating value={review.rating} readOnly precision={1} size="small" />
					<StyledLink theme={theme} to={`/profile/${review.userId}`}>
						<Typography textAlign={'right'} fontWeight={600}>
							{review.username}
						</Typography>
					</StyledLink>
				</StyledBox>
			</ReviewHeader>

			<Typography color={'#ffffffb5'} pt={2}>{review.text}</Typography>
		</Card>
	);
};

export default Review;
