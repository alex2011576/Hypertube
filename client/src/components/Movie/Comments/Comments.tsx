import { Typography } from '@mui/material';
import Text from '../../Text';

const Comments = ({ movieId }: { movieId: number }) => {
	return (
		<>
			<Typography variant="h6" color={'white'}>
				<Text tid="plot" />
			</Typography>
			<Typography color={'text.secondary'} textAlign={'left'}></Typography>
		</>
	);
};

export default Comments;
