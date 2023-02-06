// prettier-ignore
import { validateUsername, validateFirstname, validateLastname, validateProfileForm } from '../../utils/inputValidators';
// import React, { useContext, useState } from 'react';
// prettier-ignore
import { Button, Box, TextField, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useControlledField } from '../../hooks/useControlledField';
import { PhotoType, UserData, NewUserData } from '../../types';
import profileService from '../../services/profile';
import { useStateValue } from '../../state';
// import { AlertContext } from '../AlertProvider';
import { useToggleButton } from '../../hooks/useToggleButton';
import { LightTooltip } from '../Tooltip';
import { languageOptions } from '../../languages';
import { useState } from 'react';
import ProfilePictureUploader from './ProfilePictureUploader';

const ProfileForm: React.FC<{ userData: UserData; photo: PhotoType | undefined }> = ({
	userData,
	photo
}) => {
	const [{ loggedUser }] = useStateValue();
	// const { success: successCallback, error: errorCallback } = useContext(AlertContext);
	const [image, setImage] = useState<PhotoType | undefined>(photo);

	const username = useControlledField(
		'text',
		userData.username,
		'Username',
		validateUsername
	);
	const firstname = useControlledField(
		'text',
		userData.firstname,
		'First name',
		validateFirstname
	);
	const lastname = useControlledField(
		'text',
		userData.lastname,
		'Last name',
		validateLastname
	);
	const language = useToggleButton(userData.language);

	const updateUserData = async (newUserData: NewUserData) => {
		try {
			loggedUser && (await profileService.updateProfile(loggedUser.id, newUserData));
			loggedUser && (await profileService.uploadPhoto(loggedUser.id, image)); // <<- this will be inside update profile!
			//successCallback(`Profile settings were updated!.`);
		} catch (err) {
			// errorCallback(
			// 	err.response?.data?.error ||
			// 		'Unable to update profile settings. Please try again.'
			// );
		}
	};

	const handleUserDataUpdate = (event: any) => {
		event.preventDefault();
		const newUserData: UserData = {
			username: username.value,
			firstname: firstname.value,
			lastname: lastname.value,
			language: language.value
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
					fullWidth
					size="small"
					required
					autoComplete="username"
				/>
				<TextField
					{...firstname}
					fullWidth
					size="small"
					required
					autoFocus
					autoComplete="given-name"
				/>
				<TextField
					{...lastname}
					fullWidth
					size="small"
					required
					autoComplete="family-name"
				/>
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
						Update Profile
					</Button>
				) : (
					<LightTooltip title="Please fill all the required fields">
						<span>
							<Button
								disabled
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Update Profile
							</Button>
						</span>
					</LightTooltip>
				)}
			</Box>
		</>
	);
};

export default ProfileForm;
