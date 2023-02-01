/* eslint-disable @typescript-eslint/no-unused-vars */
//prettier-ignore
import { Avatar, Box, Button, TextField, Grid, Container, Link, Typography,  } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useField } from '../../hooks/useField';
import { validateEmail } from '../../utils/inputValidators';
import { AlertContext } from '../AlertProvider';
// import userService from '../../services/users';

const ForgotPasswordForm = () => {
	const email = useField('text', 'Email', validateEmail);
	const alert = useContext(AlertContext);
	const navigate = useNavigate();

	// const handleForgotPwdRequest = async (event: any) => {
	// 	event.preventDefault();

	// 	try {
	// 		await userService.requestPasswordReset(email.value);
	// 		alert.success('Reset link sent! Please check your inbox.');
	// 		navigate('/login');
	// 	} catch (err) {
	// 		alert.error(
	// 			err.response?.data?.error || 'Unable to send a link. Please try again.'
	// 		);
	// 		navigate('/forgot_password');
	// 	}
	// };

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
					noValidate
					// onSubmit={handleForgotPwdRequest}
				>
					<TextField
						{...email}
						required
						fullWidth
						autoFocus
						autoComplete="email"
						InputLabelProps={{ shrink: true }}
					/>
					<Button
						type="submit"
						fullWidth
						disabled={validateEmail(email.value) ? true : false}
						variant="contained"
						sx={{ mt: 2, mb: 2 }}
					>
						Send
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="/login" variant="body2">
								Back to sign in
							</Link>
						</Grid>
						<Grid item>
							<Link href="/signup" variant="body2">
								Sign Up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default ForgotPasswordForm;