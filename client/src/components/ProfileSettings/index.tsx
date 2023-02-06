/* eslint-disable @typescript-eslint/no-unused-vars */
// import { getPhotos, getProfile } from '../../services/profile';
import { Paper, styled, Container, Box, Typography, Divider, Alert } from '@mui/material';
import { PhotoType, UserData } from '../../types';
import { useServiceCall } from '../../hooks/useServiceCall';
import { useStateValue } from '../../state';
import ProfileForm from './ProfileForm';
import withAuthRequired from '../AuthRequired';
import UpdateEmailForm from './UpdateEmailForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import ProfilePictureUploader from './ProfilePictureUploader';
import { getProfile, getPhoto } from '../../services/profile';
import Text from '../Text';


const StyledButtons = styled('div')(() => ({
	background: 'white',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-evenly',
	textAlign: 'center',
	padding: '0.75rem'
}));

const StyledWrapper = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	padding: '1rem'
}));

const StyledHeader = styled(Typography)(() => ({
	margin: '1rem 0',
	fontWeight: 600
}));

const ProfileEditor = () => {
	const [{ loggedUser }] = useStateValue();

	const {
		data: profileData,
		error: profileError
	}: { data: UserData | undefined; error: Error | undefined } = useServiceCall(
		async () => loggedUser && (await getProfile(loggedUser.id)),
		[loggedUser]
	);

	const {
		data: photosData,
		error: photosError
	}: { data: PhotoType | undefined; error: Error | undefined } = useServiceCall(
		async () => loggedUser && (await getPhoto(loggedUser.id)),
		[loggedUser]
	);

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
				<Paper>
					<StyledHeader variant="h6" color="primary">
						<Text tid='titleProfile' />
					</StyledHeader>
					<Divider />
					<StyledWrapper>
						<ProfileForm userData={userData} photo={undefined} />
					</StyledWrapper>
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
