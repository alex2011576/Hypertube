import { Typography } from '@mui/material';

const CountryAndYear = ({ plot }: { plot: string }) => {
	return plot.length > 3 ? (
		<>
			<Typography variant="h6" color={'white'}>
				PLOT {/*TID!*/}
			</Typography>
			<Typography color={'text.secondary'} textAlign={'left'}>
				{plot}
			</Typography>
		</>
	) : (
		<></>
	);
};

export default CountryAndYear;
