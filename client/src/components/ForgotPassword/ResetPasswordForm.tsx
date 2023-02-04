/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { LightTooltip } from '../Tooltip';
import { useField } from '../../hooks/useField';
import { AlertContext } from '../AlertProvider';
import { validatePassword } from '../../utils/inputValidators';
// import userService from '../../services/users';

//prettier-ignore
import { Box, Button, TextField, Grid, Container, Link, Checkbox, FormControlLabel } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const ResetPasswordForm = ({ token }: { token: string }) => {
	const password = useField('text', 'Password', validatePassword);
	const navigate = useNavigate();
	const alert = useContext(AlertContext);
	const [showPassword, setShowPassword] = useState(false);

	// const handleResetPassword = async (event: any) => {
	// 	event.preventDefault();

	// 	try {
	// 		await userService.resetPassword(token, password.value);
	// 		alert.success('Password changed successfully!');
	// 		navigate('/login');
	// 	} catch (err) {
	// 		alert.error(
	// 			err.response?.data?.error || 'Unable to reset password. Please try again.'
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
					sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}
					// onSubmit={handleResetPassword}
				>
					<input
						hidden
						type="text"
						readOnly
						autoComplete="username"
						value="{{ }}"
					></input>
					<LightTooltip title="Password should be at least 8 characters long, contain at least one uppercase and lowercase letter, number and symbols">
						<TextField
							{...password}
							size="small"
							required
							fullWidth
							type={showPassword ? 'text' : 'password'}
							autoComplete="current-password"
						/>
					</LightTooltip>
					<Grid item xs={12} sx={{ marginLeft: '5px' }}>
						<FormControlLabel
							label={
								<Box component="div" fontSize={'0.9rem'}>
									Show password
								</Box>
							}
							control={
								<Checkbox
									color="primary"
									onChange={() => setShowPassword(!showPassword)}
									icon={<VisibilityOffOutlinedIcon fontSize="small" />}
									checkedIcon={<VisibilityOutlinedIcon fontSize="small" />}
								/>
							}
						/>
					</Grid>

					<Button
						type="submit"
						variant="contained"
						disabled={validatePassword(password.value) ? true : false}
						sx={{ mt: 3, mb: 2 }}
					>
						SUBMIT
					</Button>

					<Grid container>
						<Grid item xs>
							<Link href="/login" variant="body2">
								Back to log in
							</Link>
						</Grid>
						<Grid item>
							<Link href="/signup" variant="body2">
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default ResetPasswordForm;
