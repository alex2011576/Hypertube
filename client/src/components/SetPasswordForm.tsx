import { Box, Button, Container, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks/useField';
import { validatePassword, validateSetPasswordForm } from '../utils/inputValidators'; //validateSamePasswords function needed
import { AlertContext } from './AlertProvider';
import withAuthRequired from './AuthRequired';
import userService from '../services/users';
import Text from './Text';
import { useStateValue } from '../state';

const SetPasswordForm = () => {
	// this page available only for those who registered via Oauth (42/Github) and is logging for the first time, aka no password has been set yet
	// for now aleksei is setting random pwd on backend
	// on backend should check if password already set and redirect from this page if so.
	const [{ loggedUser }] = useStateValue();
	const password = useField('text', <Text tid="textFieldPassword" />, validatePassword);
	const confirmPassword = useField(
		'text',
		<Text tid="textFieldConfirmPassword" />,
		validatePassword
	);
	const [showPassword, setShow] = useState(false);
	const alert = useContext(AlertContext);
	const navigate = useNavigate();

	const handleSetPassword = async (event: any) => {
		event.preventDefault();
		try {
			loggedUser && await userService.setPassword(password.value, confirmPassword.value, loggedUser.id);
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
						type={showPassword ? 'text' : 'password'}
						autoComplete="password"
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						{...confirmPassword}
						size="small"
						required
						type={showPassword ? 'text' : 'password'}
						autoComplete="password"
						InputLabelProps={{ shrink: true }}
					/>
					<FormControlLabel
						label={
							<Box component="div" fontSize={'0.9rem'}>
								<Text tid="showPasswords" />
							</Box>
						}
						control={
							<Checkbox
								color="primary"
								onChange={() => setShow(!showPassword)}
								icon={<VisibilityOffOutlinedIcon fontSize={'small'} />}
								checkedIcon={
									<VisibilityOutlinedIcon fontSize={'small'} />
								}
							/>
						}
					/>
					<Button
						type="submit"
						disabled={validateSetPasswordForm(password.value, confirmPassword.value) ? false : true}
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
