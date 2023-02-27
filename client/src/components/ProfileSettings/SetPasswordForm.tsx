/* eslint-disable @typescript-eslint/no-unused-vars */
//prettier-ignore
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Checkbox, FormControlLabel, Box, Grid, Container, Typography } from "@mui/material";
//prettier-ignore
import { validatePassword, validateSetPasswordForm } from '../../utils/inputValidators';
import { useContext, useState, Dispatch, SetStateAction } from 'react';
import { useFieldWithReset } from '../../hooks/useField';
import { AlertContext } from '../AlertProvider';
import { useStateValue } from '../../state';
import userService from '../../services/users';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Text from "../Text";

const dialogBtn = {
	margin: '10px 0 5px 0',
	padding: '5px 25px',
	maxWidth: '100%'
};

const SetPasswordForm: React.FC<{ setIsPasswordSet: Dispatch<SetStateAction<boolean>>, setPassword: string | null }> = ({
	setIsPasswordSet,
	setPassword
}) => {
	const [{ loggedUser }] = useStateValue();
	const { reset, ...password } = useFieldWithReset(
		'text',
		<Text tid="textFieldCurrentPassword" />,
		validatePassword
	);
	const { reset: pwdReset, ...confirmPassword } = useFieldWithReset(
		'text',
		<Text tid="textFieldNewPassword" />,
		validatePassword
	);
	console.log(setPassword);
	const [open, setOpen] = useState(setPassword ? true : false);
	const [showPassword, setShow] = useState(false);
	
	const alert = useContext(AlertContext);

	const handleClickOpen = () => setOpen(true);

	const handleClose = () => {
		setOpen(false);
		reset();
		pwdReset();
	};

	const handleSetPassword = async (event: any) => {
		event.preventDefault();
		try {
			loggedUser && await userService.setPassword(password.value, confirmPassword.value, loggedUser.id);
			alert.success('alertSuccessSetPassword');
			setIsPasswordSet(true);
		} catch (err) {
			alert.error(err.response?.data?.error || 'alertErrorSetPassword');
		}
	};

	return (
		<div>
			<Button onClick={handleClickOpen} style={dialogBtn}>
				<Text tid="profileButtonSetPassword" />
			</Button>
			<Dialog open={open} onClose={handleClose}>
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
			</Dialog>
		</div>
	);
};

export default SetPasswordForm;
