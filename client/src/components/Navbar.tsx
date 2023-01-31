import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import {
	Button,
	AppBar,
	Box,
	Typography,
	styled,
	Toolbar,
	Backdrop,
	Modal
} from '@mui/material';
import { useStateValue } from '../state';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertContext } from './AlertProvider';
import { logoutUser } from '../services/logout';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

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
	const [openLogin, setOpenLogin] = useState(false);
	const [openSignup, setOpenSignup] = useState(false);

	const handleOpenLogin = () => setOpenLogin(true);
	const handleCloseLogin = () => setOpenLogin(false);

	const handleToggleSignup = () => setOpenSignup(!openSignup);
	const handleCloseSignup = () => setOpenSignup(false);

	return (
		<>
			<Button color="inherit" onClick={handleOpenLogin}>
				Login
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={openLogin}
				onClose={handleCloseLogin}
				closeAfterTransition
			>
				<div>
					<LoginForm />
				</div>
			</Modal>

			<Button color="inherit" onClick={handleToggleSignup}>
				Sign Up
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={openSignup}
				onClose={handleCloseSignup}
				closeAfterTransition
			>
				<div>
					<SignUpForm />
				</div>
			</Modal>
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
						<Typography variant="h6">HYPERTUBE</Typography>
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
		// <AppBar
		// 	position="fixed"
		// 	color="secondary"
		// 	sx={{
		// 		ml: { sm: `${drawerWidth}px` },
		// 		mb: 5,
		// 		maxWidth: '100%',
		// 		zIndex: (theme) => theme.zIndex.drawer + 1,
		// 		justifyContent: 'space-between',
		// 		'& .MuiAppBar-root': {
		// 			borderRadius: '0!important'
		// 		}
		// 	}}
		// >
		// 	<Toolbar
		// 		sx={{
		// 			justifyContent: 'space-between',
		// 			'& .MuiPaper-root': {
		// 				borderRadius: '0!important'
		// 			}
		// 		}}
		// 	>
		// 		<IconButton
		// 			color="inherit"
		// 			aria-label="open drawer"
		// 			edge="start"
		// 			onClick={handleDrawerToggle}
		// 			sx={{ mr: 2, ml: 0.5, display: !loggedUser ? 'none' : { md: 'none' } }}
		// 		>
		// 			<MenuIcon />
		// 		</IconButton>
		// 		<Box
		// 			component={Link}
		// 			to="/"
		// 			sx={{
		// 				textDecoration: 'none',
		// 				ml: 1,
		// 				display: !loggedUser ? 'flex' : { xs: 'none', sm: 'none', md: 'flex' },
		// 				alignItems: 'center'
		// 			}}
		// 		>
		// 			<div
		// 				style={{
		// 					fontFamily: "'Paytone One', cursive",
		// 					fontSize: '1.6rem',
		// 					color: '#ffc600',
		// 					textAlign: 'center'
		// 				}}
		// 			>
		// 				Match
		// 			</div>
		// 			<BrightnessAutoIcon style={{ marginTop: '4px' }} color="primary" />
		// 		</Box>
		// 		<div>
		// 			{loggedUser ? (
		// 				<LoggedInUserButtons handleLogout={handleLogout} />
		// 			) : (
		// 				<LoggedOutButtons />
		// 			)}
		// 		</div>
		// 	</Toolbar>
		// </AppBar>
	);
};

export default Navbar;
