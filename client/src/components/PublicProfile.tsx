import { styled, Container, Box, Typography } from '@mui/material';
import { ProfilePublic, PhotoType } from '../types';
import { getProfile, getPhoto } from '../services/profile';
import { useServiceCall } from '../hooks/useServiceCall';
import { Navigate, useParams } from 'react-router-dom';
import { languageOptions } from '../languages';
import withAuthRequired from './AuthRequired';
import CustomModal from './CustomModal';
import useModal from '../hooks/useModal';
import Text from './Text';
import LoadingIcon from './LoadingIcon';

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

export const PublicProfileBody = ({ id }: { id: string | undefined }) => {
	const {
		data: profileData,
		error: profileError
	}: { data: ProfilePublic | undefined; error: Error | undefined } = useServiceCall(
		async () => id && (await getProfile(id)),
		[id]
	);

	const {
		data: photoData,
		error: photoError
	}: { data: PhotoType | undefined; error: Error | undefined } = useServiceCall(
		async () => id && (await getPhoto(id)),
		[id]
	);

	if (profileError || photoError) return <Navigate to="/" />;

	if (!profileData) return <LoadingIcon />;

	return (
		<StyledWrapper>
			<Typography variant="h6" color="primary" mb={2}>
				@{profileData.username.toUpperCase()}
			</Typography>
			<Container style={pictureSectionWrapper}>
				<Photo src={photoData?.imageDataUrl || placeholder.img} alt="Profile pic" />
			</Container>
			<Typography variant="h6" mt={2}>
				{profileData.firstname +
					' ' +
					profileData.lastname +
					' ' +
					languageOptions[profileData.language]}
			</Typography>
			<StyledWrapper></StyledWrapper>
		</StyledWrapper>
	);
};

const PublicProfile = () => {
	const { id } = useParams();
	const { isOpen, handleToggle, title, children } = useModal(
		<PublicProfileBody id={id} />,
		<Text tid="publicProfileHeader" />
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
