//prettier-ignore
import { Box, Button, TextField, Checkbox, Grid, FormControlLabel, Container, Link, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setLoggedUser, StateContext } from '../state';
import { AlertContext } from './AlertProvider';
import { useField } from '../hooks/useField';
import { Auth42, AuthGH } from './AuthButtons';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import signUpService from '../services/signup';
import loginService from '../services/login';
import OrDivider from './OrDivider';
import Text from './Text';
import {
	validatePassword,
	validateUsername,
	validateLoginForm
} from '../utils/inputValidators';

const LoginForm = () => {
	const username = useField('text', <Text tid="textFieldUsername" />, validateUsername);
	const password = useField('text', <Text tid="textFieldPassword" />, validatePassword);

	const [showPassword, setShow] = useState(false);

	const navigate = useNavigate();

	const [, dispatch] = useContext(StateContext);

	const [searchParams] = useSearchParams();
	const activationCode = searchParams.get('activate');
	const alert = useContext(AlertContext);

	useEffect(() => {
		const activateAccount = async () => {
			if (activationCode) {
				try {
					await signUpService.activate(activationCode);
					navigate('/login');
					alert.success('Account activated successfully!');
				} catch (err) {
					alert.error(
						err.response?.data?.error ||
							'Unable to activate account. Please try again.'
					);
					navigate('/login');
				}
			}
		};
		activateAccount();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLogin = async (event: any) => {
		event.preventDefault();

		const userToLogin = {
			username: username.value,
			password: password.value
		};

		try {
			const loggedInUser = await loginService.login(userToLogin);
			alert.success(`Logged in successfully. Welcome!`);
			dispatch(setLoggedUser(loggedInUser));
			navigate('/');
		} catch (err) {
			alert.error(err.response?.data?.error || 'Unable to login. Please try again.');
		}
	};

	return (
		<Container component="main" sx={{ maxWidth: '100%', mt: 5, mb: 6 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Box
					component="form"
					sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}
					noValidate
					onSubmit={handleLogin}
					display="flex"
					flexDirection="column"
				>
					<TextField
						{...username}
						size="small"
						required
						fullWidth
						autoFocus
						InputLabelProps={{ shrink: true }}
						autoComplete="username"
					/>
					<TextField
						{...password}
						size="small"
						required
						fullWidth
						type={showPassword ? 'text' : 'password'}
						autoComplete="current-password"
						InputLabelProps={{ shrink: true }}
					/>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'stretch',
							width: '100%',
							justifyContent: 'space-between'
						}}
					>
						<Grid item xs={12} sx={{ marginLeft: '5px' }}>
							<FormControlLabel
								label={
									<Box component="div" fontSize={'0.9rem'}>
										<Text tid="showPassword" />
									</Box>
								}
								control={
									<Checkbox
										sx={{ p: '0 4px' }}
										color="primary"
										onChange={() => setShow(!showPassword)}
										icon={<VisibilityOffOutlinedIcon fontSize="small" />}
										checkedIcon={
											<VisibilityOutlinedIcon fontSize={'small'} />
										}
									/>
								}
							/>
						</Grid>
						<Grid item xs>
							<Link
								href="/forgot_password"
								variant="body2"
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									textAlign: 'right'
								}}
							>
								<Text tid="troubleLoggingIn" />
							</Link>
						</Grid>
					</Box>
					{validateLoginForm(username.value, password.value) ? (
						<Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
							<Text tid="buttonLogin" />
						</Button>
					) : (
						<Button
							type="submit"
							disabled
							variant="contained"
							sx={{ mt: 2, mb: 2 }}
						>
							<Text tid="buttonLogin" />
						</Button>
					)}
					<OrDivider />
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							mt: '20px'
						}}
					>
						<Auth42 />
						<AuthGH />
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							mt: '20px'
						}}
					>
						<Typography mr={1} variant="body2">
							<Text tid="newToLink" />{' '}
						</Typography>
						<Link href="/signup" variant="body2">
							<Text tid="signupNow" />
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginForm;
