//prettier-ignore
import { Paper, styled, Box, Rating, TextField, Button } from '@mui/material';
import { SetStateAction, useContext, useState } from 'react';
import { useFieldWithReset } from '../../../hooks/useField';
import { validateReview } from '../../../utils/inputValidators';
import { AlertContext } from '../../AlertProvider';
import { UserReview } from '../../../types';
import { Link } from 'react-router-dom';
import movieService from '../../../services/movie';
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

const ReviewForm = ({
	movieId,
	setPage
}: {
	movieId: number;
	setPage: (page: SetStateAction<number | undefined>) => void;
}) => {
	const { reset: clearInputField, ...review } = useFieldWithReset(
		'text',
		<Text tid="textFieldReview" />,
		validateReview
	);
	const [rating, setRating] = useState<number | null>(0);
	const alert = useContext(AlertContext);

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const userReview: UserReview = { text: review.value, rating: rating || 0 };
		try {
			await movieService.review(movieId, userReview);
			setPage(undefined);
			clearInputField();
		} catch (err) {
			alert.error('alertPostReviewError');
		}
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
				<Button type="submit" disabled={!review.value.length} size="large">
					<Text tid="sendReview" />
				</Button>
			</Box>
		</Card>
	);
};

export default ReviewForm;
