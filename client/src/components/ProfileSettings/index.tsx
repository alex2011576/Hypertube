import { Paper, styled, Container, Box, Typography, Divider, Alert } from '@mui/material';
import { getProfile, getPhoto, getIsPasswordSet  } from '../../services/profile';
import { PhotoType, UserData } from '../../types';
import { useServiceCall } from '../../hooks/useServiceCall';
import { useStateValue } from '../../state';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateEmailForm from './UpdateEmailForm';
import SetPasswordForm from './SetPasswordForm';
import withAuthRequired from '../AuthRequired';
import ProfileForm from './ProfileForm';
import Text from '../Text';
import { useEffect, useState } from 'react';

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
	const [isPasswordSet, setIsPasswordSet] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (loggedUser) {
			setIsLoading(true);
			(async function() {
				setIsPasswordSet(await getIsPasswordSet(loggedUser.id))
				setIsLoading(false);
			})();
		}
	}, [loggedUser]);

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

	if (profileError || photosError)
	return (
		<Alert severity="error">
			<Text tid="profileLoadingError" />
		</Alert>
	);

	if (!profileData || !photosData || isLoading) return <>loading</>;

	const userData: UserData = {
		username: profileData.username,
		firstname: profileData.firstname,
		lastname: profileData.lastname,
		language: profileData.language,
	};

	return (
		<Container maxWidth={'sm'} sx={{ mt: 4, mb: 4 }}>
			<Paper>
				<StyledHeader variant="h6" color="primary">
					<Text tid="titleProfile" />
				</StyledHeader>
				<Divider />
				<StyledWrapper>
					<ProfileForm userData={userData} photo={photosData} />
				</StyledWrapper>
			</Paper>
			<Paper sx={{ marginTop: 5 }}>
				<StyledButtons>
					<UpdateEmailForm />
					{isPasswordSet ? <UpdatePasswordForm /> : <SetPasswordForm setIsPasswordSet={setIsPasswordSet} /> }
				</StyledButtons>
			</Paper>
		</Container>
	);
};

export default withAuthRequired(ProfileEditor);
