import { Typography } from '@mui/material';
import Text from '../../Text';

const Comment = () => {
	return (
		<>
			<Typography variant="h6" color={'white'}>
				<Text tid="plot" />
			</Typography>
			<Typography color={'text.secondary'} textAlign={'left'}></Typography>
		</>
	);
};

export default Comment;
