import { Typography } from '@mui/material';
import Text from '../Text';

const CountryAndYear = ({ plot }: { plot: string }) => {
	return plot.length > 3 ? (
		<>
			<Typography variant="h6" color={'white'}>
				<Text tid='plot'/>
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
