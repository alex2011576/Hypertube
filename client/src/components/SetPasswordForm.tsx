import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks/useField';
import { validatePassword } from '../utils/inputValidators'; //validateSamePasswords function needed
import { AlertContext } from './AlertProvider';
import withAuthRequired from './AuthRequired';
// import userService from '../services/users';
import Text from './Text';

const SetPasswordForm = () => {

	// this page available only for those who registered via Oauth (42/Github) and is logging for the first time, aka no password has been set yet
	// for now aleksei is setting random pwd on backend
	// on backend should check if password already set and redirect from this page if so.
	
	const password = useField('text', <Text tid="textFieldPassword" />, validatePassword);
	const confirmPassword = useField(
		'text',
		<Text tid="textFieldConfirmPassword" />,
		validatePassword
	);

	const alert = useContext(AlertContext);
	const navigate = useNavigate();

	const handleSetPassword = async (event: any) => {
		event.preventDefault();

		try {
			// await userService.setPassword(password.value, confirmPassword.value); //not existing service
			alert.success('alertSuccessSetPassword');
			navigate('/');
		} catch (err) {
			alert.error(err.response?.data?.error || 'alertErrorSetPassword');
		}
	};

	return (
		<Container component="main" sx={{ maxWidth: '100%', mt: 2, mb: 6 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Typography mb={3} textAlign="center">
					<Text tid="setPasswordInfoText" />
				</Typography>
				<Box
					component="form"
					noValidate
					sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}
					onSubmit={handleSetPassword}
				>
					<TextField
						{...password}
						size="small"
						required
						autoFocus
						autoComplete="password"
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						{...confirmPassword}
						size="small"
						required
						autoComplete="password"
						InputLabelProps={{ shrink: true }}
					/>
					<Button
						type="submit"
						// disabled={validateSamePasswords(password.value, confirmPassword.value) ? true : false}
						variant="contained"
						sx={{ mt: 2, mb: 2 }}
					>
						<Text tid="submitBtn" />
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default withAuthRequired(SetPasswordForm);
