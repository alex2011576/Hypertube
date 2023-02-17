//prettier-ignore
import { Paper, styled, Box, Rating, TextField, Button } from '@mui/material';
import { validateReview } from '../../../utils/inputValidators';
import { AlertContext } from '../../AlertProvider';
import { useContext, useState } from 'react';
import { UserReview } from '../../../types';
import { useField } from '../../../hooks/useField';
import { Link } from 'react-router-dom';
import theme from '../../../theme';
import Text from '../../Text';

const Card = styled(Paper)(({ theme }) => ({
	backgroundColor: '#ffffff5e',
	padding: theme.spacing(2),
	textAlign: 'justify',
	color: 'white',
	marginTop: '1rem'
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

const ReviewForm = () => {
	const review = useField('text', <Text tid="textFieldReview" />, validateReview);
	const [rating, setRating] = useState<number | null>(0);
	// const alert = useContext(AlertContext);

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		const userReview: UserReview = { text: review.value, rating: rating || 0 };

		console.log(userReview);
		// try {
		// 	await movieService.leaveReview(userReview);
		// } catch (err) {
		// 	alert.error(err.response?.data?.error || 'alertLoginError');
		// }
	};
	return (
		<Card theme={theme}>
			<Rating
				size="small"
				max={5}
				value={rating}
				onChange={(_e, newValue) => {
					setRating(newValue);
				}}
			/>
			<Box
				component="form"
				sx={{ flexDirection: 'row', alignItems: 'baseline', pt: 1 }}
				noValidate
				onSubmit={handleSubmit}
				display="flex"
				flexDirection="column"
			>
				<TextField
					{...review}
					size="small"
					sx={{ input: { color: 'white' } }}
					required
					fullWidth
				/>
				<Button type="submit" size="large">
					SEND {/* TID */}
				</Button>
			</Box>
		</Card>
	);
};

export default ReviewForm;
