// prettier-ignore
import { validateUsername, validateFirstname, validateLastname, validateProfileForm } from '../../utils/inputValidators';
import React, { useContext, useState } from 'react';
// prettier-ignore
import { Button, Box, TextField, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { PhotoType, UserData, NewUserData, LanguageOption } from '../../types';
import { useControlledField } from '../../hooks/useControlledField';
import { useToggleButton } from '../../hooks/useToggleButton';
import { setLoggedUser, useStateValue } from '../../state';
import { languageOptions } from '../../languages';
import { AlertContext } from '../AlertProvider';
import { LightTooltip } from '../Tooltip';
import ProfilePictureUploader from './ProfilePictureUploader';
import profileService from '../../services/profile';
import Text from '../Text';

const ProfileForm: React.FC<{ userData: UserData; photo: PhotoType | undefined }> = ({
	userData,
	photo
}) => {
	const [{ loggedUser }, dispatch] = useStateValue();
	const { success: successCallback, error: errorCallback } = useContext(AlertContext);
	const [image, setImage] = useState<PhotoType | undefined>(photo);

	const username = useControlledField(
		'text',
		userData.username,
		<Text tid="textFieldUsername" />,
		validateUsername
	);
	const firstname = useControlledField(
		'text',
		userData.firstname,
		<Text tid="textFieldFirstName" />,
		validateFirstname
	);
	const lastname = useControlledField(
		'text',
		userData.lastname,
		<Text tid="textFieldLastName" />,
		validateLastname
	);
	const language = useToggleButton(userData.language || 'enUS');

	const updateUserData = async (newUserData: NewUserData) => {
		try {
			loggedUser && (await profileService.updateProfile(loggedUser.id, newUserData));
			loggedUser &&
				dispatch(
					setLoggedUser({
						...loggedUser,
						username: username.value,
						language: language.value as LanguageOption
					})
				);
			successCallback('profileFormSuccess');
		} catch (err) {
			errorCallback(err.response?.data?.error || 'profileFormError');
		}
	};

	const handleUserDataUpdate = (event: any) => {
		event.preventDefault();
		const newUserData: NewUserData = {
			username: username.value,
			firstname: firstname.value,
			lastname: lastname.value,
			language: language.value,
			photo: image
		};
		updateUserData(newUserData);
	};

	return (
		<>
			<Box component="form" noValidate sx={{ ml: 2, mr: 2 }}>
				<ProfilePictureUploader photo={undefined} setImage={setImage} image={image} />
				<Grid item xs={12}>
					<Box sx={{ flexDirection: 'column' }}>
						<ToggleButtonGroup exclusive {...language}>
							{Object.entries(languageOptions).map(([id, flag]) => (
								<ToggleButton size="small" key={id} value={id}>
									{flag}
								</ToggleButton>
							))}
						</ToggleButtonGroup>
					</Box>
				</Grid>
				<TextField
					{...username}
					autoFocus
					fullWidth
					size="small"
					required
					autoComplete="username"
				/>
				<TextField {...firstname} fullWidth size="small" required />
				<TextField {...lastname} fullWidth size="small" required />
				{username.value &&
				firstname.value &&
				lastname.value &&
				language.value &&
				validateProfileForm(username.value, firstname.value, lastname.value) ? (
					<Button
						type="submit"
						onClick={handleUserDataUpdate}
						variant="contained"
						fullWidth
						sx={{ mt: 3, mb: 2 }}
					>
						<Text tid="profileButtonUpdate" />
					</Button>
				) : (
					<LightTooltip title={<Text tid="profileUpdateToolTip" />}>
						<span>
							<Button
								disabled
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								<Text tid="profileButtonUpdate" />
							</Button>
						</span>
					</LightTooltip>
				)}
			</Box>
		</>
	);
};

export default ProfileForm;
