import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Text from '../Text';

const LoggedUserButtonGroup = ({ handleLogout }: { handleLogout: any }) => {
	return (
		<Box sx={{ pr: 0 }}>
			<Button color="inherit" component={Link} to="/profile">
				<Text tid="navbarProfile" />
			</Button>
			<Button onClick={handleLogout}>
				<Text tid="navbarLogout" />
			</Button>
		</Box>
	);
};

export default LoggedUserButtonGroup;
