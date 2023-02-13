import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import withAuthRequired from '../AuthRequired';

const MoviePage = () => {
	const { id } = useParams();
	return <Box>Hello movie here</Box>;
};

export default withAuthRequired(MoviePage);
