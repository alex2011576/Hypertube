import { Paper, Typography, styled, Box, Rating, Avatar } from '@mui/material';
import { ReviewType } from '../../../types';
import { Link } from 'react-router-dom';
import placeholder from './profilePlaceholder.jpeg';
import theme from '../../../theme';
import useModal from '../../../hooks/useModal';
import CustomModal from '../../CustomModal';
import Text from '../../Text';
import { PublicProfileBody } from '../../PublicProfile';

const Card = styled(Paper)(({ theme }) => ({
	height: '450px',
	backgroundColor: '#ffffff5e',
	padding: theme.spacing(2),
	textAlign: 'justify',
	color: theme.palette.text.secondary,
	overflowWrap: 'break-word'
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
	const { isOpen, handleToggle, title, children } = useModal(
		<PublicProfileBody id={review.userId} />,
		<Text tid="publicProfileHeader" />
	);
	return (
		<Card theme={theme}>
			<ReviewHeader>
				<Avatar alt={review.username} src={review.photo || placeholder} />
				<StyledBox>
					{review.rating > 0 && (
						<Rating value={review.rating} readOnly precision={1} size="small" />
					)}
					{/* <StyledLink theme={theme} to={`/profile/${review.userId}`}> */}
					<Box onClick={handleToggle}>
						<Typography textAlign={'right'} fontWeight={600}>
							{review.username}
						</Typography>
					</Box>	
					{/* </StyledLink> */}
				</StyledBox>
			</ReviewHeader>
			<Typography color={'#ffffffb5'} pt={2}>
				{review.text}
			</Typography>
		<CustomModal
			isOpen={isOpen}
			handleToggle={handleToggle}
			title={title}
			children={children}
		/>
		</Card>
	);
};

export default Review;
