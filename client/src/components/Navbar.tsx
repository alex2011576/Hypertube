/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, AppBar, Box, Typography, styled, Toolbar } from '@mui/material';
import { useStateValue } from '../state';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertContext } from './AlertProvider';
import { logoutUser } from '../services/logout';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import useModal from '../hooks/useModal';
import CustomModal from './CustomModal';

const Logo = styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 60px;
	padding: 1rem;
`;

const LoggedInUserButtons = ({ handleLogout }: { handleLogout: any }) => {
	return (
		<Box sx={{ pr: 0 }}>
			<Button color="secondary" component={Link} to="/login">
				Logout
			</Button>
		</Box>
	);
};

const LoggedOutButtons = () => {
	const {
		isOpen: isLoginOpen,
		handleToggle: toggleLogin,
		title: loginTitle,
		children: loginForm
	} = useModal(<LoginForm />, 'LOGIN');

	const {
		isOpen: isSignUpOpen,
		handleToggle: toggleSignUp,
		title: signUpTitle,
		children: signUpForm
	} = useModal(<SignUpForm />, 'SIGN UP');

	return (
		<>
			<Button color="inherit" onClick={toggleLogin}>
				Login
			</Button>
			<CustomModal
				isOpen={isLoginOpen}
				handleToggle={toggleLogin}
				title={loginTitle}
				children={loginForm}
			/>
			<Button color="inherit" onClick={toggleSignUp}>
				Sign Up
			</Button>
r
		</>
	);
};

const Navbar = () => {
	const [, dispatch] = useStateValue();
	const [{ loggedUser }] = useStateValue();
	const navigate = useNavigate();

	const alert = useContext(AlertContext);

	const handleLogout = async (event: any) => {
		event.preventDefault();
		logoutUser(dispatch);
		alert.success('Logged out');
		navigate('/');
	};

	return (
		<AppBar color="secondary">
			<Toolbar
				sx={{
					width: '100%',
					justifyContent: 'space-between'
				}}
			>
				<Box component={Link} to="/" sx={{ textDecoration: 'none' }} color="inherit">
					<Logo>
						<SmartDisplayIcon fontSize="large" />
						<Typography variant="h6" ml={1}>
							HYPERTUBE
						</Typography>
					</Logo>
				</Box>
				<Box>
					{loggedUser ? (
						<LoggedInUserButtons handleLogout={handleLogout} />
					) : (
						<LoggedOutButtons />
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
