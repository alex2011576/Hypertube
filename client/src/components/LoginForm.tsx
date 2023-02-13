//prettier-ignore
import { Box, Button, TextField, Checkbox, FormControlLabel, Container, Link, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setLoggedUser, StateContext } from '../state';
import { AlertContext } from './AlertProvider';
import { useField } from '../hooks/useField';
import { Auth42, AuthGH } from './AuthButtons';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import userService from '../services/users';
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
					await userService.activate(activationCode);
					navigate('/login');
					alert.success('alertAccountActivated');
				} catch (err) {
					alert.error(err.response?.data?.error || 'alertLoginError');
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
			dispatch(setLoggedUser(loggedInUser));
			alert.success('alertLoginSuccess');
			navigate('/');
		} catch (err) {
			alert.error(err.response?.data?.error || 'alertLoginError');
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
							flexDirection: { xs: 'column', sm: 'row' },
							alignItems: { xs: 'stretch' },
							width: '100%',
							justifyContent: { xs: 'stretch', sm: 'space-between' }
						}}
					>
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
									checkedIcon={<VisibilityOutlinedIcon fontSize={'small'} />}
								/>
							}
							sx={{ margin: 0 }}
						/>
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
