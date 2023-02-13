import express from 'express';
//prettier-ignore
import { parseEmail, parseNewUserPayload, parseUserProfilePayload, validateEmailToken, validatePassword, validateToken } from '../validators/userPayloadValidators';
import asyncHandler from 'express-async-handler';
//prettier-ignore
import { activateAccount, changeForgottenPassword, changeUserEmail, createNewUser, sendActivationCode, sendResetLink, sendUpdateEmailLink, updatePassword } from '../services/users';
import { AppError } from '../errors';
import { findPasswordResetRequestByToken } from '../repositories/passwordResetRequestRepository';
import { sessionExtractor } from '../utils/middleware';
import { CustomRequest } from '../types';
import { findUpdateEmailRequestByToken } from '../repositories/updateEmailRequestRepository';
import { getUserAvatarByUserId, getUserDataByUserId, updateUserDataByUserId } from '../repositories/userRepository';
import { isStringRepresentedInteger } from '../validators/basicTypeValidators';

const router = express.Router();

router.post(
	'/',
	asyncHandler(async (req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const newUser = parseNewUserPayload(req.body);
		const createdUser = await createNewUser(newUser);
		sendActivationCode(createdUser);
		res.status(201).json(createdUser);
	})
);

router.post(
	'/activate/:id',
	asyncHandler(async (req, res) => {
		await activateAccount(req.params.id);
		res.status(200).end();
	})
);

router.post(
	'/forgot_password',
	asyncHandler(async (req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const email = parseEmail(req.body.email);
		await sendResetLink(email);
		res.status(201).end();
	})
);

router.get(
	'/forgot_password/',
	asyncHandler(() => {
		throw new AppError('usersForgotPasswordMissingToken', 400);
	})
);

router.get(
	'/forgot_password/:id',
	asyncHandler(async (req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const token = validateToken(req.params.id);
		const passwordResetRequsest = await findPasswordResetRequestByToken(token);
		if (!passwordResetRequsest) {
			throw new AppError('usersForgotPasswordInvalidToken', 400);
		}
		res.status(200).end();
	})
);

router.post(
	'/forgot_password/:id',
	asyncHandler(async (req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const token = validateToken(req.params.id);
		const passwordResetRequest = await findPasswordResetRequestByToken(token);
		if (!passwordResetRequest) {
			throw new AppError('usersForgotPasswordMissingOrExpired', 400);
		}
		const password = validatePassword(req.body.password);
		await changeForgottenPassword(passwordResetRequest.userId, password);
		res.status(200).end();
	})
);

//request email update
router.post(
	'/:id/update_email',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId || req.session.userId !== req.params.id) {
			throw new AppError(`usersNoRightsToUpdate`, 400);
		}
		const email = parseEmail(req.body.email);
		await sendUpdateEmailLink(req.session.userId, email);
		res.status(201).end();
	})
);

router.put(
	'/update_email',
	asyncHandler(() => {
		throw new AppError('usersUpdateEmailMissingToken', 400);
	})
);

//update email
router.put(
	'/update_email/:token',
	asyncHandler(async (req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const token = validateEmailToken(req.params.token);
		const emailResetRequsest = await findUpdateEmailRequestByToken(token);
		if (!emailResetRequsest) {
			throw new AppError('usersUpdateEmailInvalidToken', 400);
		}
		await changeUserEmail(emailResetRequsest);
		res.status(200).end();
	})
);

//update password
router.put(
	'/:id/password',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId || req.session.userId !== req.params.id) {
			throw new AppError(`usersNoRightsToUpdate`, 400);
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const oldPassword = validatePassword(req.body.oldPassword);
		const password = validatePassword(req.body.password);
		await updatePassword(req.session.userId, oldPassword, password);
		res.status(200).end();
	})
);
//get profile data
router.get(
	'/:id',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`usersNoRightsToGet`, 400);
		}
		if (!isStringRepresentedInteger(req.params.id)) {
			throw new AppError(`usersUserNotFound`, 400);
		}
		const result = await getUserDataByUserId(req.params.id);
		if (!result) {
			throw new AppError(`usersUserNotFound`, 400);
		}
		res.status(200).json(result);
	})
);
//get profile avatar
router.get(
	'/:id/photo',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId) {
			throw new AppError(`usersNoRightsToGet`, 400);
		}
		if (!isStringRepresentedInteger(req.params.id)) {
			throw new AppError(`usersUserNotFound`, 400);
		}
		const avatarDataURL = await getUserAvatarByUserId(req.params.id);
		// if (!avatarDataURL) {
		// 	res.status(200).json(undefined);
		// 	return;
		// }
		res.status(200).json({ imageDataUrl: avatarDataURL });
	})
);
// update profile data
router.put(
	'/:id',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId || req.session.userId !== req.params.id) {
			throw new AppError(`usersNoRightsToUpdate`, 400);
		}
		const userId = req.session.userId;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const updatedProfile = await parseUserProfilePayload(req.body);

		await updateUserDataByUserId(userId, updatedProfile);
		res.status(200).end();
	})
);

export default router;
