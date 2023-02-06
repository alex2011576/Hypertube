import express from 'express';
//prettier-ignore
import { parseEmail, parseNewUserPayload, validateEmailToken, validatePassword, validateToken } from '../validators/userPayloadValidators';
import asyncHandler from 'express-async-handler';
//prettier-ignore
import { activateAccount, changeForgottenPassword, changeUserEmail, createNewUser, sendActivationCode, sendResetLink, sendUpdateEmailLink, updatePassword } from '../services/users';
import { AppError } from '../errors';
import { findPasswordResetRequestByToken } from '../repositories/passwordResetRequestRepository';
import { sessionExtractor } from '../utils/middleware';
import { CustomRequest } from '../types';
import { findUpdateEmailRequestByToken } from '../repositories/updateEmailRequestRepository';

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
		throw new AppError('Missing activation code', 400);
	})
);

router.get(
	'/forgot_password/:id',
	asyncHandler(async (req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const token = validateToken(req.params.id);
		const passwordResetRequsest = await findPasswordResetRequestByToken(token);
		if (!passwordResetRequsest) {
			throw new AppError('Invalid reset link. Please try again.', 400);
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
			throw new AppError('Reset password code is missing or expired. Please try again.', 400);
		}
		const password = validatePassword(req.body.password);
		await changeForgottenPassword(passwordResetRequest.userId, password);
		res.status(200).end();
	})
);

router.post(
	'/:id/update_email',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId || req.session.userId !== req.params.id) {
			throw new AppError(`No rights to update profile data`, 400);
		}
		const email = parseEmail(req.body.email);
		await sendUpdateEmailLink(req.session.userId, email);
		res.status(201).end();
	})
);

router.put(
	'/update_email',
	asyncHandler(() => {
		throw new AppError('Missing activation code', 400);
	})
);

//also need to renew backend session and send it back to front?
router.put(
	'/update_email/:token',
	asyncHandler(async (req, res) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const token = validateEmailToken(req.params.token);
		const emailResetRequsest = await findUpdateEmailRequestByToken(token);
		if (!emailResetRequsest) {
			throw new AppError('Invalid reset link. Please try again.', 400);
		}
		await changeUserEmail(emailResetRequsest);
		res.status(200).end();
	})
);

router.put(
	'/:id/password',
	sessionExtractor,
	asyncHandler(async (req: CustomRequest, res) => {
		if (!req.session || !req.session.userId || req.session.userId !== req.params.id) {
			throw new AppError(`No rights to update profile data`, 400);
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const oldPassword = validatePassword(req.body.oldPassword);
		const password = validatePassword(req.body.password);
		await updatePassword(req.session.userId, oldPassword, password);
		res.status(200).end();
	})
);


export default router;
