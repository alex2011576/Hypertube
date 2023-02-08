/* eslint-disable @typescript-eslint/no-unused-vars */
// import { getPhotos, getProfile } from '../../services/profile';
import { styled, Container, Box, Typography, Divider } from '@mui/material';
import { PhotoType, ProfilePublic, UserData } from '../types';
import { useServiceCall } from '../hooks/useServiceCall';
import { languageOptions } from '../languages';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import withAuthRequired from './AuthRequired';
import useModal from '../hooks/useModal';
import CustomModal from './CustomModal';
import Text from './Text';

const StyledWrapper = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	padding: '1rem',
	alignItems: 'center'
}));

const pictureSectionWrapper = {
	display: 'grid',
	maxWidth: '320px!important',
	minHeight: '320px!important'
};

const Photo = styled('img')`
	max-width: 100%;
	max-height: 100%;
	margin: auto;
	border-radius: 7px;
	object-fit: scale-down;
`;

const placeholder = {
	img: 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
	title: 'Placeholder',
	featured: true
};

const PublicProfileBody = ({ id }: { id: string | undefined }) => {
	// const {
	// 	data: profileData,
	// 	error: profileError
	// }: { data: ProfilePublic | undefined; error: Error | undefined } = useServiceCall(
	// 	async () => id && (await getProfile(id)),
	// 	[id]
	// );

	// const {
	// 	data: photoData,
	// 	error: photoError
	// }: { data: PhotoType | undefined; error: Error | undefined } = useServiceCall(
	// 	async () => id && (await getPhoto(id)),
	// 	[id]
	// );
	const photoData: PhotoType | undefined = { imageDataUrl: undefined }; //temp
	// if (profileError || photosError)
	// 	return (
	// 		<Alert severity="error">
	// 			Error loading account settings, please try again...
	// 		</Alert>
	// 	);

	// if (!profileData) return <LoadingIcon />;

	return (
		<StyledWrapper>
			<Typography variant="h6" color="primary" mb={2}>
				@{'test'.toUpperCase()}
				{/* @{(profileData.username).toUpperCase()} */}
			</Typography>
			<Container style={pictureSectionWrapper}>
				<Photo src={photoData?.imageDataUrl || placeholder.img} alt="Profile pic" />
			</Container>
			<Typography variant="h6" mt={2}>
				ilona {/* {profileData.firstname} */}
				shakurova {/* {profileData.lastname} */}
				{languageOptions.svSE} {/* {profileData.language} */}
			</Typography>
			<StyledWrapper></StyledWrapper>
		</StyledWrapper>
	);
};

const PublicProfile = () => {
	const { id } = useParams();
	const { isOpen, handleToggle, title, children } = useModal(
		<PublicProfileBody id={id} />,
		'USER PROFILE' // change later
	);

	return (
		<CustomModal
			isOpen={!isOpen}
			handleToggle={handleToggle}
			title={title}
			children={children}
		/>
	);
};

export default withAuthRequired(PublicProfile);
