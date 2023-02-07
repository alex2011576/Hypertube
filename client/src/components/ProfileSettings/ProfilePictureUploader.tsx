/* eslint-disable react-hooks/exhaustive-deps */
//prettier-ignore
import {Box, Button, Container, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';
import { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getValidImage, openFileDialog } from '../../utils/imageUploaderAndValidator';
import { AlertContext } from '../AlertProvider';
import { PhotoType } from '../../types';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import Text from '../Text';

const ProfilePictureUploader: React.FC<{
	photo: PhotoType | undefined;
	image: PhotoType | undefined;
	setImage: (photo: PhotoType | undefined) => void;
}> = ({ photo, image, setImage }) => {
	const [imageIndex, setImageIndex] = useState<number>(-1);
	const { error: errorCallback } = useContext(AlertContext);
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
									<Text tid='profileImageUpload' />
									<br />
								</strong>
							</Typography>
							<Text tid='profileImageTypography' />
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
	<Tooltip placement="top" {...props} classes={{ popper: className }} />
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
	backgroundColor: 'transparent',
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
