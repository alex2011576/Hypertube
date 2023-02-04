/* eslint-disable react-hooks/exhaustive-deps */
//prettier-ignore
import {Box, Button, Container, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
//prettier-ignore
import {
	getValidImage,
	openFileDialog
} from '../../utils/imageUploaderAndValidator';
import { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { PhotoType } from '../../types';
import { useStateValue } from '../../state';
import { AlertContext } from '../AlertProvider';
import { LightTooltip } from '../Tooltip';
// import profileService from '../../services/profile';

const ProfilePictureUploader: React.FC<{ photo: PhotoType | undefined }> = ({ photo }) => {
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [imageIndex, setImageIndex] = useState<number>(-1);
	const [image, setImage] = useState<PhotoType | undefined>();
	const [{ loggedUser }] = useStateValue();
	const { success: successCallback, error: errorCallback } = useContext(AlertContext);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		photo && setImage(photo);
	}, []);

	const handleChange = async (file: FileList | null) => {
		if (!file) return;
		const [newImage, error] = await getValidImage(file);
		if (error) errorCallback(error);
		if (!newImage) return;
		setImage(newImage);
	};

	const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		await handleChange(e.target.files);
		imageIndex > -1 && setImageIndex(-1);
		if (inputRef.current) inputRef.current.value = '';
	};

	const handleClickInput = useCallback(() => openFileDialog(inputRef), [inputRef]);

	const uploadImage = useCallback((): void => {
		setImageIndex(-1);
		handleClickInput();
	}, [handleClickInput]);

	const uploadPhoto = async (image: PhotoType) => {
		try {
			setIsUploading(true);
			// loggedUser && (await profileService.uploadPhoto(loggedUser.id, image));
			successCallback(`Profile photo was updated!.`);
			setIsUploading(false);
		} catch (err) {
			errorCallback(
				err.response?.data?.error || 'Unable to upload photo. Please try again.'
			);
			setIsUploading(false);
		}
	};

	const handleUserPhotosUpload = (event: any) => {
		event.preventDefault();
		image && uploadPhoto(image);
	};

	return (
		<Box>
			<input
				type="file"
				accept="image/png, image/jpeg, image/jpg"
				ref={inputRef}
				multiple
				onChange={onInputChange}
				style={{ display: 'none' }}
			/>
			<Container style={pictureSectionWrapper}>
				<HtmlTooltip
					title={
						<Fragment>
							<Typography color="inherit">
								<strong>
									Valid picture should be: <br />
								</strong>
							</Typography>
							{'Of jpeg, jpg or png format.'}
							<br />
							{'At least 450 x 450 pixels'}
							<br />
							{'Not larger than 6000x4000 pixels'}
							<br />
							{'Not bigger than 25Mb'}
						</Fragment>
					}
				>
					<Box sx={mainGridItem}>
						<Container>
							<Photo
								onClick={uploadImage}
								src={image?.imageDataUrl || placeholder.img}
								alt="Profile pic"
							/>
							{image?.imageDataUrl ? (
								<div style={btnWrapper}>
									<Button
										onClick={() => setImage(undefined)}
										sx={singlePicBtn}
									>
										<RemoveCircleRoundedIcon sx={icon} />
									</Button>
								</div>
							) : null}
						</Container>
					</Box>
				</HtmlTooltip>
				<Button onClick={handleUserPhotosUpload} disabled={isUploading}>
					Update profile picture
				</Button>
			</Container>
		</Box>
	);
};

const Photo = styled('img')`
	max-width: 100%;
	max-height: 100%;
	margin: auto;
	border-radius: 7px;
	object-fit: scale-down;
`;

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.primary.light,
		color: 'white',
		maxWidth: 300,
		padding: '25px',
		fontSize: '1rem',
		borderRadius: 3
	}
}));

const gridContainer = {
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	alignItems: 'center'
};

const pictureSectionWrapper = {
	display: 'grid',
	maxWidth: '320px!important',
	minHeight: '320px!important'
};

const mainGridItem = {
	height: 'fit-content',
	margin: '10px 10px 0 10px',
	display: 'flex',
	justifyContent: 'center'
};

const btnWrapper = {
	display: 'flex',
	justifyContent: 'space-between'
};

const singlePicBtn = {
	backgroundColor: 'white!important',
	margin: '0 0.3rem',
	minWidth: 'fit-content',
	minHeight: 'fit-content',
	position: 'relative',
	borderRadius: 28,
	bottom: '1.75rem',
	padding: '0'
};

const icon = {
	fontSize: 'large',
	transform: 'scale(1.4)'
};

const placeholder = {
	img: 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
	title: 'Placeholder',
	featured: true
};

export default ProfilePictureUploader;
