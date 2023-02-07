// prettier-ignore
import { validateUsername, validateFirstname, validateLastname, validateProfileForm } from '../../utils/inputValidators';
import React, { useContext, useEffect, useState } from 'react';
// prettier-ignore
import { Button, Box, TextField, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useControlledField } from '../../hooks/useControlledField';
import { PhotoType, UserData, NewUserData, LanguageOption } from '../../types';
import profileService from '../../services/profile';
import { useStateValue } from '../../state';
import { AlertContext } from '../AlertProvider';
import { useToggleButton } from '../../hooks/useToggleButton';
import { LightTooltip } from '../Tooltip';
import { languageOptions } from '../../languages';
import ProfilePictureUploader from './ProfilePictureUploader';
import Text from '../Text';
import { setUserLanguage } from '../../state';

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
	const language = useToggleButton(userData.language);

	const updateUserData = async (newUserData: NewUserData) => {
		try {
			loggedUser && (await profileService.updateProfile(loggedUser.id, newUserData));
			successCallback(`Profile settings were updated!.`);
		} catch (err) {
			errorCallback(
				err.response?.data?.error ||
					'Unable to update profile settings. Please try again.'
			);
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

	useEffect(() => {
		language.value && dispatch(setUserLanguage(language.value as LanguageOption));
		language.value && window.localStorage.setItem('language', language.value);
	}, [dispatch, language.value]);

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
