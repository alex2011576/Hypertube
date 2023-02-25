/* eslint-disable @typescript-eslint/no-unused-vars */
//prettier-ignore
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Checkbox, FormControlLabel, Box, Grid } from "@mui/material";
//prettier-ignore
import { validatePassword, validateUpdatePasswordForm } from '../../utils/inputValidators';
import { useContext, useState } from 'react';
import { useFieldWithReset } from '../../hooks/useField';
import { AlertContext } from '../AlertProvider';
import { useStateValue } from '../../state';
import profileService from '../../services/profile';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Text from '../Text';

const dialogBtn = {
	margin: '10px 0 5px 0',
	padding: '5px 25px',
	maxWidth: '100%'
};

const UpdatePasswordForm = () => {
	const { reset, ...oldPassword } = useFieldWithReset(
		'text',
		<Text tid="textFieldCurrentPassword" />,
		validatePassword
	);
	const { reset: pwdReset, ...password } = useFieldWithReset(
		'text',
		<Text tid="textFieldNewPassword" />,
		validatePassword
	);
	const { success: successCallback, error: errorCallback } = useContext(AlertContext);
	const [{ loggedUser }] = useStateValue();
	const [showPasswords, setShowPasswords] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => setOpen(true);

	const handleClose = () => {
		setOpen(false);
		reset();
		pwdReset();
	};

	const requestUpdatePassword = async ({
		userId,
		oldPassword,
		password
	}: {
		userId: string;
		oldPassword: string;
		password: string;
	}) => {
		try {
			await profileService.updatePassword({ userId, oldPassword, password });
			successCallback('profileUpdatePasswordSuccess');
		} catch (err) {
			errorCallback(err.response?.data?.error || 'profileUpdatePasswordError');
		}
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		if (loggedUser)
			requestUpdatePassword({
				userId: loggedUser?.id,
				oldPassword: oldPassword.value,
				password: password.value
			});
		handleClose();
	};

	return (
		<div>
			<Button onClick={handleClickOpen} style={dialogBtn}>
				<Text tid="profileButtonChangePassword" />
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle sx={{ textAlign: 'center' }}>
					<Text tid="profileButtonChangePassword" />
				</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ textAlign: 'center', mb: '2rem' }}>
						<Text tid="profilePasswordInfoText" />
					</DialogContentText>
					<Box component="form">
						<input readOnly hidden type="text" autoComplete="username" />
						<TextField
							{...oldPassword}
							autoFocus
							fullWidth
							type={showPasswords ? 'text' : 'password'}
							autoComplete="current-password"
							required
							variant="standard"
						/>
						<TextField
							{...password}
							fullWidth
							type={showPasswords ? 'text' : 'password'}
							autoComplete="new-password"
							required
							variant="standard"
						/>
					</Box>

					<Grid item xs={12} sx={{ marginLeft: '5px' }}>
						<FormControlLabel
							label={
								<Box component="div" fontSize={'0.9rem'}>
									<Text tid="showPasswords" />
								</Box>
							}
							control={
								<Checkbox
									color="primary"
									onChange={() => setShowPasswords(!showPasswords)}
									icon={<VisibilityOffOutlinedIcon fontSize="small" />}
									checkedIcon={<VisibilityOutlinedIcon fontSize="small" />}
								/>
							}
						/>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>
						<Text tid="profielButtonCancel" />
					</Button>
					{oldPassword.value &&
					password.value &&
					validateUpdatePasswordForm(oldPassword.value, password.value) ? (
						<Button onClick={handleSubmit}>
							<Text tid="profielButtonSend" />
						</Button>
					) : (
						<Button disabled>
							<Text tid="profielButtonSend" />
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default UpdatePasswordForm;
