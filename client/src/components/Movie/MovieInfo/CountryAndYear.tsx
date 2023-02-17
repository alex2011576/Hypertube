import { Box, styled, Typography } from '@mui/material';

const Row = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const CountryAndYear = ({ country, year }: { country: string; year: number | undefined }) => {
	return (
		<Row>
			{country && (
				<Typography color={'text.disabled'} mr={year ? 1 : 0}>
					{country + (year && country && ',')}
				</Typography>
			)}
			<Typography color={'white'}>{year}</Typography>
		</Row>
	);
};

export default CountryAndYear;
