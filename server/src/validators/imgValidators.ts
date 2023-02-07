import { ValidationError } from '../errors';
import { PhotoType } from '../types';
import { isPhotoObject, isString } from './basicTypeValidators';
import Jimp from 'jimp';

const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

export const parseImage = async (photo: unknown): Promise<PhotoType | undefined> => {
	if (!isPhotoObject(photo)) return undefined;

	const image = photo.imageDataUrl;
	if (!image) return undefined;
	if (!isString(image)) throw new ValidationError(`Invalid images format! Image is not an Image Data URI`);
	if (!/data:image\//.test(image)) throw new ValidationError(`Invalid images format! Image is not an Image Data URI`);
	const [, type, dataBase64] = image.match('data:(image/.*);base64,(.*)') || [];
	if (!type) throw new ValidationError(`Invalid images format! Allowed types: 'image/jpeg', 'image/png', 'image/jpg'`);
	if (allowedImageTypes.indexOf(type) < 0) throw new ValidationError(`Invalid images format! Allowed types: 'image/jpeg', 'image/png', 'image/jpg'`);
	if (!dataBase64) throw new ValidationError(`Invalid images format! Image is not valid Image Data URI`);
	const fileSizeInBytes = Math.ceil(dataBase64.length / 4) * 3;
	if (fileSizeInBytes - 2 > 25000000) throw new ValidationError(`Invalid images format! Image is too big: 25mb max`);
	const imageBuffer = Buffer.from(dataBase64, 'base64');
	const jimpInstance = await Jimp.read(imageBuffer);
	const width = jimpInstance.bitmap.width;
	const height = jimpInstance.bitmap.height;
	if (width <= 0 || height <= 0) {
		throw new ValidationError(`Invalid images format! Image is corrupted`);
	}
	if (width < 10|| height < 10) {
		throw new ValidationError(`Invalid images format! Image is too small. Min 10x10 pixels`);
	}
	if (width > 6000 || height > 4000) {
		throw new ValidationError(`Invalid images format! Image is too big. Max 6000x4000 pixels`);
	}
	if (width > height && height / width < 0.6) {
		throw new ValidationError(`Invalid images format! Image is of unacceptable ratio.`);
	}
	if (height > width && width / height < 0.6) {
		throw new ValidationError(`Invalid images format! Image is of unacceptable ratio.`);
	}

	// return {
	// 	imageType: type,
	// 	dataBase64: dataBase64
	// };
	return { imageDataUrl: image } as PhotoType;
};
