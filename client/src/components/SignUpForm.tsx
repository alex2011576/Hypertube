/* eslint-disable @typescript-eslint/no-unused-vars */
//prettier-ignore
import { Box, Button, TextField, FormControlLabel, Checkbox, Grid, Container, Link, Typography } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

//prettier-ignore
import { validateEmail, validateFirstname, validateLastname, validatePassword, validateUsername, validateSignUpForm } from '../utils/inputValidators';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from './AlertProvider';
import { useField } from '../hooks/useField';
import { NewUser } from '../types';
import { LightTooltip } from './Tooltip';
import OrDivider from './OrDivider';
import { Auth42, AuthGH } from './AuthButtons';
// import userService from './services/users';

const SignUpForm = () => {
	const firstname = useField('text', <Text tid='textFieldFirstName' />, validateFirstname);
	const lastname = useField('text', <Text tid='textFieldLastName' />, validateLastname);
	const username = useField('text', <Text tid='textFieldUsername' />, validateUsername);
	const email = useField('text', <Text tid='textFieldEmail' />, validateEmail);
	const password = useField('text', <Text tid='textFieldPassword' />, validatePassword);

	const [showPassword, setShow] = useState(false);

	const alert = useContext(AlertContext);
	const navigate = useNavigate();

	// const addNewUser = async (newUser: NewUser) => {
	// 	try {
	// 		const addedUser = await userService.create(newUser);
	// 		alert.success(
	// 			`User ${addedUser.username} is created! Activation link is sent to email.`
	// 		);
	// 		navigate('/login');
	// 	} catch (err) {
	// 		alert.error(
	// 			err.response?.data?.error || 'Unable to add a user. Please try again.'
	// 		);
	// 	}
	// };

	const submitNewUser = (event: any) => {
		event.preventDefault();
		const newUser: NewUser = {
			username: username.value,
			email: email.value,
			passwordPlain: password.value,
			firstname: firstname.value,
			lastname: lastname.value
		};
		console.log(newUser);
		// addNewUser(newUser);
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
					noValidate
					onSubmit={submitNewUser}
					sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}
				>
					<Grid container columnSpacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								{...firstname}
								size="small"
								required
								fullWidth
								autoFocus
								autoComplete="given-name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								{...lastname}
								size="small"
								required
								fullWidth
								style={{ margin: '0 2 0 9' }}
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...username}
								size="small"
								required
								fullWidth
								autoComplete="username"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...email}
								size="small"
								required
								fullWidth
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<LightTooltip title={<Text tid='passwordTooltip'/>}>
								<TextField
									{...password}
									size="small"
									required
									fullWidth
									type={showPassword ? 'text' : 'password'}
									autoComplete="new-password"
								/>
							</LightTooltip>
						</Grid>
						<Grid item xs={12} sx={{ marginLeft: '5px' }}>
							<FormControlLabel
								label={
									<Box component="div" fontSize={'0.9rem'}>
										<Text tid='showPassword' />
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
						</Grid>
					</Grid>
					{validateSignUpForm(
						username.value,
						email.value,
						password.value,
						firstname.value,
						lastname.value
					) ? (
						<Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
							<Text tid='signupButton' />
						</Button>
					) : (
						<Button
							type="submit"
							disabled
							variant="contained"
							sx={{ mt: 2, mb: 2 }}
						>
							<Text tid='signupButton' />
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
						<Auth42/>
						<AuthGH/>
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
							<Text tid='signupAlready' />{' '}
						</Typography>
						<Link href="/login" variant="body2">
						<Text tid='signupLogin' />
						</Link>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default SignUpForm;
