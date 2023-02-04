/* eslint-disable @typescript-eslint/no-unused-vars */
// import { getPhotos, getProfile } from '../../services/profile';
import { Paper, styled, Container, Box, Typography, Divider } from '@mui/material';
import { PhotoType, UserData } from '../../types';
import { useServiceCall } from '../../hooks/useServiceCall';
import { useStateValue } from '../../state';
import ProfileForm from './ProfileForm';
import withAuthRequired from '../AuthRequired';
import UpdateEmailForm from './UpdateEmailForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import ProfilePictureUploader from './ProfilePictureUploader';

const StyledButtons = styled('div')(() => ({
	background: 'white',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-evenly',
	textAlign: 'center',
	padding: '0.75rem'
}));

const ProfileEditor = () => {
	const [{ loggedUser }] = useStateValue();

	// const {
	// 	data: profileData,
	// 	error: profileError
	// }: { data: UserData | undefined; error: Error | undefined } = useServiceCall(
	// 	async () => loggedUser && (await getProfile(loggedUser.id)),
	// 	[loggedUser]
	// );

	// const {
	// 	data: photosData,
	// 	error: photosError
	// }: { data: Images | undefined; error: Error | undefined } = useServiceCall(
	// 	async () => loggedUser && (await getPhotos(loggedUser.id)),
	// 	[loggedUser]
	// );

	// if (profileError || photosError)
	// 	return (
	// 		<Alert severity="error">
	// 			Error loading account settings page, please try again...
	// 		</Alert>
	// 	);

	// if (!profileData || !photosData) return <LoadingIcon />;

	const userData: UserData = {
		// username: profileData.username,
		// firstname: profileData.firstname,
		// lastname: profileData.lastname,
		// language: profileData.language
		username: 'tempinput',
		firstname: 'fetcheddatahere',
		lastname: 'shouldntbeempty',
		language: 'ruRU'
	};

	return (
		<>
			<Container maxWidth={'sm'} sx={{ mt: 4, mb: 8 }}>
				<Paper >
					<Typography variant='h6' color='primary' sx={{mt: 3, mb: 3, fontWeight: 600}}>PROFILE SETTINGS</Typography>
					<Divider sx={{width: '100%'}} />
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							p: 3
						}}
					>
						<ProfilePictureUploader photo={undefined} />
						<ProfileForm userData={userData} />
					</Box>
				</Paper>
				<Paper sx={{ marginTop: 5 }}>
					<StyledButtons>
						<UpdateEmailForm />
						<UpdatePasswordForm />
					</StyledButtons>
				</Paper>
			</Container>
		</>
	);
};

export default withAuthRequired(ProfileEditor);
