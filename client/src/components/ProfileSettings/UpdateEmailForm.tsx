/* eslint-disable @typescript-eslint/no-unused-vars */
//prettier-ignore
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material";
import { useContext, useState } from 'react';
import { useFieldWithReset } from '../../hooks/useField';
import { validateEmail } from '../../utils/inputValidators';
import { AlertContext } from '../AlertProvider';
import { useStateValue } from '../../state';
import profileService from '../../services/profile';
import Text from "../Text";

const UpdateEmailForm = () => {
	const { success: successCallback, error: errorCallback } = useContext(AlertContext);
	const [{ loggedUser }] = useStateValue();
	const { reset, ...email } = useFieldWithReset('text', <Text tid="textFieldEmail" />, validateEmail);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => setOpen(true);

	const handleClose = () => {
		setOpen(false);
		reset();
	};

	const requestUpdateEmailAndHandleError = async ({
		userId,
		email
	}: {
		userId: string;
		email: string;
	}) => {
		try {
			await profileService.requestUpdateEmail({userId, email});
			successCallback('profileUpdateEmailSuccess');
		} catch (err) {
			errorCallback(err.message || 'profileUpdateEmailError');
		}
	};

	const handleSumbit = (event: any) => {
		event.preventDefault();
		if (loggedUser)
			requestUpdateEmailAndHandleError({ userId: loggedUser?.id, email: email.value });
		setOpen(false);
		reset();
	};

	return (
		<div>
			<Button onClick={handleClickOpen} color={undefined} style={dialogBtn}>
				<Text tid="profileButtonChangeEmail" />
			</Button>
			<Dialog open={open} onClose={handleClose} sx={{ textAlign: 'center' }}>
				<DialogTitle><Text tid="profileEmailTitle" /></DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Text tid="profileEmailInfoText" />
					</DialogContentText>
					<TextField
						{...email}
						autoFocus
						margin="dense"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}><Text tid="profielButtonCancel" /></Button>
					<Button onClick={handleSumbit}><Text tid="profielButtonSend" /></Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const dialogBtn = {
	margin: '10px 0 5px 0',
	padding: '5px 25px',
	maxWidth: '100%'
};

export default UpdateEmailForm;
