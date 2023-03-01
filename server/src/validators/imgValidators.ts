import { ValidationError } from '../errors';
import { PhotoType } from '../types';
import { isPhotoObject, isString } from './basicTypeValidators';
import Jimp from 'jimp';

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

export const parseImage = async (photo: unknown): Promise<PhotoType | undefined> => {
	if (!isPhotoObject(photo)) return undefined;

	const image = photo.imageDataUrl;
	if (!image) return undefined;
	if (!isString(image)) {
		throw new ValidationError('imageInvalidFormat');
	}
	if (!/data:image\//.test(image)) {
		throw new ValidationError('imageInvalidFormat');
	}
	const [, type, dataBase64] = image.match('data:(image/.*);base64,(.*)') || [];
	if (!type) {
		throw new ValidationError('imageInvalidType');
	}
	if (allowedImageTypes.indexOf(type) < 0) {
		throw new ValidationError('imageInvalidType');
	}
	if (!dataBase64) {
		throw new ValidationError('imageInvalidFormat');
	}
	const fileSizeInBytes = Math.ceil(dataBase64.length / 4) * 3;
	if (fileSizeInBytes - 2 > 25000000) {
		throw new ValidationError('imageSizeTooBig');
	}
	const imageBuffer = Buffer.from(dataBase64, 'base64');
	const jimpInstance = await Jimp.read(imageBuffer);
	const width = jimpInstance.bitmap.width;
	const height = jimpInstance.bitmap.height;
	if (width <= 0 || height <= 0) {
		throw new ValidationError('imageCorrupted');
	}
	if (width < 10 || height < 10) {
		throw new ValidationError('imageTooSmall');
	}
	if (width > 6000 || height > 4000) {
		throw new ValidationError('imageTooBig');
	}
	if (width > height && height / width < 0.6) {
		throw new ValidationError('imageInvalidRatio');
	}
	if (height > width && width / height < 0.6) {
		throw new ValidationError('imageInvalidRatio');
	}

	// return {
	// 	imageType: type,
	// 	dataBase64: dataBase64
	// };
	return { imageDataUrl: image } as PhotoType;
};

export const checkMovieCover = async (cover: string): Promise<string> => {
	try {
		const image = await Jimp.read(cover);
		//console.log("Found image", cover);
		if (image) return cover;
	} catch (err) {
		void err;
		//console.log("Error ", cover);
		return '';
	}
	//console.log("No image", cover);
	return '';
};
