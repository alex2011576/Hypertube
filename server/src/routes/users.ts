import express from 'express';
import { parseNewUserPayload } from '../validators/userPayloadValidators';
import asyncHandler from 'express-async-handler';
import { activateAccount, createNewUser, sendActivationCode } from '../services/users';
// import { AppError, ValidationError } from '../errors';
// import { findUpdateEmailRequestByToken } from '../repositories/updateEmailRequestRepository';
// import { findPasswordResetRequestByToken } from '../repositories/passwordResetRequestRepository';
// //prettier-ignore
// import { getTagsByUserId, getUserDataByUserId, getUserEntries, updateFameRatingByUserId, updateUserDataByUserId } from '../repositories/userRepository';
// import { CustomRequest } from '../types';
// import { sessionExtractor } from '../utils/middleware';
// //prettier-ignore
// import { parseNewUserPayload, parseEmail, validateToken, validatePassword, validateEmailToken, parseUserProfilePayload, parseIdList } from '../validators/userPayloadValidators';
// //prettier-ignore
// import { activateAccount, createNewUser, sendActivationCode, sendResetLink, changeForgottenPassword, updatePassword, sendUpdateEmailLink, changeUserEmail, updateUserPhotos, getUserPhotosById, getAndUpdateUserCompletnessById, getPublicProfileData, likeUser, dislikeUser, getLikeAndMatchStatusOnVisitedProfile, blockUser, unblockUser, getBlockStatus, reportFakeUser, getNotifications, getNotificationsPage, getUserChats, getChatUsers, getChatMessagesPage, getBlockedButNotReportedUsers } from '../services/users';
// import { getLocation } from '../services/location';
// import { parseImages } from '../validators/imgValidators';
// import { isStringRepresentedInteger } from '../validators/basicTypeValidators';
// import { getLikesByVisitedId, getLikesByVisitorId } from '../repositories/likesRepository';
// import { getVisitHistoryByVisitedId, getVisitHistoryByVisitorId } from '../repositories/visitHistoryRepository';
// import { getMatchesByUserId } from '../repositories/matchesRepository';
// import { getNotificationsQueueCount } from '../repositories/notificationsQueueRepository';
// import { getChatNotificationsByReceiver } from '../repositories/chatNotificationsRepostiory';
// import { getMatchSuggestions } from '../services/search';
// import { parseFilterCriterias, parseSortCriteria } from '../validators/sortAndFilterValidators';

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

// router.post(
// 	'/forgot_password',
// 	asyncHandler(async (req, res) => {
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// 		const email = parseEmail(req.body.email);
// 		await sendResetLink(email);
// 		res.status(201).end();
// 	})
// );

// router.get(
// 	'/forgot_password/',
// 	asyncHandler(() => {
// 		throw new AppError('Missing activation code', 400);
// 	})
// );

// router.get(
// 	'/forgot_password/:id',
// 	asyncHandler(async (req, res) => {
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// 		const token = validateToken(req.params.id);
// 		const passwordResetRequsest = await findPasswordResetRequestByToken(token);
// 		if (!passwordResetRequsest) {
// 			throw new AppError('Invalid reset link. Please try again.', 400);
// 		}
// 		res.status(200).end();
// 	})
// );

// router.post(
// 	'/forgot_password/:id',
// 	asyncHandler(async (req, res) => {
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// 		const token = validateToken(req.params.id);
// 		const passwordResetRequest = await findPasswordResetRequestByToken(token);
// 		if (!passwordResetRequest) {
// 			throw new AppError('Reset password code is missing or expired. Please try again.', 400);
// 		}
// 		const password = validatePassword(req.body.password);
// 		await changeForgottenPassword(passwordResetRequest.userId, password);
// 		res.status(200).end();
// 	})
// );

// router.post(
// 	'/:id/update_email',
// 	sessionExtractor,
// 	asyncHandler(async (req: CustomRequest, res) => {
// 		if (!req.session || !req.session.userId || req.session.userId !== req.params.id) {
// 			throw new AppError(`No rights to update profile data`, 400);
// 		}
// 		const email = parseEmail(req.body.email);
// 		await sendUpdateEmailLink(req.session.userId, email);
// 		res.status(201).end();
// 	})
// );

// router.put(
// 	'/update_email',
// 	asyncHandler(() => {
// 		throw new AppError('Missing activation code', 400);
// 	})
// );

// //also need to renew backend session and send it back to front?
// router.put(
// 	'/update_email/:token',
// 	asyncHandler(async (req, res) => {
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// 		const token = validateEmailToken(req.params.token);
// 		const emailResetRequsest = await findUpdateEmailRequestByToken(token);
// 		if (!emailResetRequsest) {
// 			throw new AppError('Invalid reset link. Please try again.', 400);
// 		}
// 		await changeUserEmail(emailResetRequsest);
// 		res.status(200).end();
// 	})
// );

// router.put(
// 	'/:id/password',
// 	sessionExtractor,
// 	asyncHandler(async (req: CustomRequest, res) => {
// 		if (!req.session || !req.session.userId || req.session.userId !== req.params.id) {
// 			throw new AppError(`No rights to update profile data`, 400);
// 		}
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// 		const oldPassword = validatePassword(req.body.oldPassword);
// 		const password = validatePassword(req.body.password);
// 		await updatePassword(req.session.userId, oldPassword, password);
// 		res.status(200).end();
// 	})
// );


export default router;
