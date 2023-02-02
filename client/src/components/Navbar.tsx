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
import LangSelector from './LangSelector';

const Logo = styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 60px;
	padding: 16px 0 1rem 1rem;
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
	} = useModal(<LoginForm />, 'LOG IN');

	const {
		isOpen: isSignUpOpen,
		handleToggle: toggleSignUp,
		title: signUpTitle,
		children: signUpForm
	} = useModal(<SignUpForm />, 'SIGN UP');

	return (
		<>
			<Button
				color="inherit"
				onClick={toggleLogin}
				sx={{
					fontSize: { xs: 12, sm: 14, md: '0.85rem', lg: '0.9rem' },
					minWidth: '50px',
					padding: '6px'
				}}
			>
				Login
			</Button>
			<CustomModal
				isOpen={isLoginOpen}
				handleToggle={toggleLogin}
				title={loginTitle}
				children={loginForm}
			/>
			<Button
				color="inherit"
				onClick={toggleSignUp}
				sx={{
					fontSize: { xs: 12, sm: 14, md: '0.85rem', lg: '0.9rem' },
					minWidth: '50px',
					padding: '6px'
				}}
			>
				Sign Up
			</Button>
			<CustomModal
				isOpen={isSignUpOpen}
				handleToggle={toggleSignUp}
				title={signUpTitle}
				children={signUpForm}
			/>
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
					justifyContent: 'space-between',
					padding: '0'
				}}
			>
				<Box component={Link} to="/" sx={{ textDecoration: 'none' }} color="inherit">
					<Logo>
						<SmartDisplayIcon />
						<Typography
							variant="h6"
							ml={1}
							sx={{
								fontSize: { xs: 14, sm: 14, md: '1.1rem', lg: '1.1rem' },
								fontWeight: 700
							}}
						>
							HYPERTUBE
						</Typography>
					</Logo>
				</Box>
				<Box sx={{ display: 'flex' }}>
					{loggedUser ? (
						<LoggedInUserButtons handleLogout={handleLogout} />
					) : (
						<LoggedOutButtons />
					)}
					<LangSelector />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
// {display: {xs: 'none', sm: 'none', md: 'flex'
