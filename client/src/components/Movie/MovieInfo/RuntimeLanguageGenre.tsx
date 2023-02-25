import { Box, Typography, styled } from '@mui/material';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const Row = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const CountryAndYear = ({
	runtime,
	language,
	genre
}: {
	runtime: number | undefined;
	language: string;
	genre: string;
}) => {
	return (
		<Row>
			{runtime && (
				<Typography
					color={'text.disabled'}
					sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
				>
					<WatchLaterIcon fontSize="small" sx={{ mr: '5px' }} /> {runtime}
				</Typography>
			)}
			<Typography color={'text.secondary'} mr={1}>
				{language.toUpperCase()}
			</Typography>
			<Typography color={'text.disabled'}>{genre}</Typography>
		</Row>
	);
};

export default CountryAndYear;
