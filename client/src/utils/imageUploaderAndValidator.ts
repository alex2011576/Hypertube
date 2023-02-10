import { PhotoType } from '../types';

export const openFileDialog = (inputRef: React.RefObject<HTMLInputElement>): void => {
	if (inputRef.current) inputRef.current.click();
};

export const getBase64 = (file: File): Promise<string> => {
	const reader = new FileReader();
	return new Promise((resolve) => {
		reader.addEventListener('load', () => resolve(String(reader.result)));
		reader.readAsDataURL(file);
	});
};

export const getImage = (file: FileList): Promise<HTMLImageElement> => {
	const image = new Image();
	return new Promise((resolve, reject) => {
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', () => {
			reject('Error creating');
		});
		image.src = URL.createObjectURL(file[0]);
	});
};

export const getValidImage = async (
	file: FileList
): Promise<[PhotoType | undefined, string | undefined]> => {
	const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

	try {
		const image = await getImage(file);

		const type = file[0].type;
		const height = image.height;
		const width = image.width;
		const size = file[0].size;

		if (allowedImageTypes.indexOf(type) < 0) return [undefined, 'Invalid image type'];
		if (width < 100 || height < 100) return [undefined, 'Image is too small'];
		if (width > 6000 || height > 4000) return [undefined, 'Image is too big'];
		if (!size || size > 25000000) return [undefined, 'Invalid size'];
		if (width > height && height / width < 0.6) return [undefined, 'Invalid ratio'];
		if (height > width && width / height < 0.6) return [undefined, 'Invalid ratio'];
	} catch (e) {
		//console.log('Error decoding image', e);
	}

	return [{ imageDataUrl: await getBase64(file[0]) }, undefined];
};

// export const validateAddingFiles = async (
// 	newImage: Image,
// ): Promise<[ImageType[], string | undefined]> => {
// 	let newImageList: ImageType[] = [];

// 	if (existingImages.length + newImages.length > 5) {
// 		if (existingImages.length === 5) {
// 			return [
// 				[],
// 				'Maximum 5 pictures can be uploaded. Please remove some pictures to upload new ones or use replace button.'
// 			];
// 		} else {
// 			return [newImageList, 'Maximum 5 pictures can be added to profile.'];
// 		}
// 	}

// 	return [newImageList, undefined];
// };
