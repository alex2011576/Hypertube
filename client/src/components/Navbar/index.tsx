/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppBar, Box, Typography, styled, Toolbar } from '@mui/material';
import { useStateValue } from '../../state';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertProvider';
import { logoutUser } from '../../services/logout';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import NoLoggedUserButtonGroup from './NoLoggedUserButtonGroup';
import LoggedUserButtonGroup from './LoggedUserButtonGroup';

const Logo = styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 60px;
	padding: 16px 0 1rem 1rem;
`;

const FullWidthToolbar = styled(Toolbar)`
	width: 100%;
	justify-content: space-between;
	padding: 0;
`;

const logoStyle = {
	fontSize: { xs: 14, sm: 14, md: '1.1rem', lg: '1.1rem' },
	fontWeight: 700,
	ml: 1
};

const Navbar = () => {
	const [, dispatch] = useStateValue();
	const [{ loggedUser }] = useStateValue();
	const navigate = useNavigate();

	const alert = useContext(AlertContext);

	const handleLogout = async (event: any) => {
		event.preventDefault();
		logoutUser(dispatch);
		alert.success('alertLogout');
		navigate('/');
	};

	return (
		<AppBar color="secondary">
			<FullWidthToolbar>
				<Box component={Link} to="/" sx={{ textDecoration: 'none' }} color="inherit">
					<Logo>
						<SmartDisplayIcon />
						<Typography variant="h6" sx={logoStyle}>
							HYPERTUBE
						</Typography>
					</Logo>
				</Box>
				<Box sx={{ display: 'flex' }}>
					{loggedUser ? (
						<LoggedUserButtonGroup handleLogout={handleLogout} />
					) : (
						<NoLoggedUserButtonGroup />
					)}
				</Box>
			</FullWidthToolbar>
		</AppBar>
	);
};

export default Navbar;
