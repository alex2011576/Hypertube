//prettier-ignore
import { addNew42User, addNewGHUser, addNewUser, findUserByActivationCode, findUserByEmail, getPasswordHash, setUserAsActive, updateUserEmail, updateUserPassword } from '../repositories/userRepository';
//prettier-ignore
import { User42, NewUser, User, UserGitHub, PasswordResetRequest, EmailUpdateRequest } from '../types';
import { sendMail } from '../utils/mailer';
import { AppError } from '../errors';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
//prettier-ignore
import { addPasswordResetRequest, findPasswordResetRequestByUserId, removePasswordResetRequest, removePasswordResetRequestByUserId } from '../repositories/passwordResetRequestRepository';
//prettier-ignore
import { addUpdateEmailRequest, findUpdateEmailRequestByUserId, removeUpdateEmailRequest, removeUpdateEmailRequestByUserId } from '../repositories/updateEmailRequestRepository';
import { updateSessionEmailByUserId } from '../repositories/sessionRepository';

//create
export const createHashedPassword = async (passwordPlain: string): Promise<string> => {
	const saltRounds = 10;
	return await bcrypt.hash(passwordPlain, saltRounds);
};

export const createNewUser = async (newUser: NewUser): Promise<User> => {
	const passwordHash = await createHashedPassword(newUser.passwordPlain);
	const activationCode = crypto.randomBytes(20).toString('hex');

	return addNewUser({ ...newUser, passwordHash, activationCode });
};

export const createNew42User = async (newUser: User42): Promise<User> => {
	const activationCode = crypto.randomBytes(20).toString('hex');

	return addNew42User({ ...newUser, activationCode });
};

export const createNewGHUser = async (newUser: UserGitHub): Promise<User> => {
	const activationCode = crypto.randomBytes(20).toString('hex');

	return addNewGHUser({ ...newUser, activationCode });
};

//activate
export const sendActivationCode = (user: User): void => {
	sendMail(
		user.email,
		'Activation code for Hypertube-account',
		`<h1>Hi and thanks for signing up!</h1>
			<p>Please visit the link to activate your account here:</p>
			<a href='${process.env.REACT_APP_FRONTEND_URL}/login?activate=${user.activationCode}'>Link</a>
			<p> See you at Hypertube! <3 </p>`
	);
};

export const activateAccount = async (activationCode: string): Promise<void> => {
	const user = await findUserByActivationCode(activationCode);
	if (!user) {
		throw new AppError('usersActivationCodeMissing', 400);
	}
	if (user.isActive) {
		throw new AppError('usersAccountAlreadyActivated', 400);
	}
	if (!user.isActive) {
		await setUserAsActive(activationCode);
	}
};

//reset forgotten password
export const sendResetLink = async (email: string): Promise<void> => {
	const user = await findUserByEmail(email);
	if (!user) {
		throw new AppError('usersEmailNotFound', 400);
	}

	if (!user.isActive) {
		throw new AppError('usersAccountNotActivated', 400);
	}

	const resetRequset = await findPasswordResetRequestByUserId(user.id);
	if (resetRequset) {
		await removePasswordResetRequest(resetRequset.token);
	}

	const newResetRequset = await addPasswordResetRequest(user.id);
	if (!newResetRequset) {
		throw new AppError('usersErrorCreatingResetLink', 400);
	}
	sendResetPasswordLink(user, newResetRequset);
};

export const sendResetPasswordLink = (user: User, newResetRequset: PasswordResetRequest): void => {
	sendMail(
		user.email,
		'Password reset link for Hypertube-account',
		`<h1>Hi, forgot your password? No problem! !</h1>
			<p>Visit the link below to reset your password:</p>
			<a href='${process.env.REACT_APP_FRONTEND_URL}/forgot_password?reset=${newResetRequset.token}'>Reset password here</a>
			<p>Link will be active until ${newResetRequset.expiresAt}.</p>
			<p>Ignore this message if you haven't requested password reset.</p>

			<p> See you at Hypertube! <3 </p>`
	);
};

export const changeForgottenPassword = async (userId: string, passwordPlain: string): Promise<void> => {
	const passwordHash = await createHashedPassword(passwordPlain);
	await updateUserPassword(userId, passwordHash);
	await removePasswordResetRequestByUserId(userId);
};

export const updatePassword = async (userId: string, oldPasswordPlain: string, newPasswordPlain: string): Promise<void> => {
	const oldPwdHash = await getPasswordHash(userId);
	const confirmOldPassword = await bcrypt.compare(oldPasswordPlain, oldPwdHash);
	if (!confirmOldPassword) {
		throw new AppError('usersWrongOldPassword', 400);
	}
	const passwordHash = await createHashedPassword(newPasswordPlain);
	await updateUserPassword(userId, passwordHash);
};

export const sendUpdateEmailLink = async (id: string, email: string): Promise<void> => {
	const userWithThisEmail = await findUserByEmail(email);
	if (userWithThisEmail) {
		if (userWithThisEmail.id === id) {
			throw new AppError('usersProvideNewEmail', 400);
		} else {
			throw new AppError('usersEmailTaken', 400);
		}
	}
	const updateRequest = await findUpdateEmailRequestByUserId(id);
	if (updateRequest) {
		await removeUpdateEmailRequest(updateRequest.token);
	}

	const newUpdateRequest = await addUpdateEmailRequest(id, email);
	if (!newUpdateRequest) {
		throw new AppError('usersErrorCreatingResetLink', 400);
	}
	mailEmailUpdateLink(email, newUpdateRequest);
};

export const mailEmailUpdateLink = (email: User['email'], newUpdateRequest: EmailUpdateRequest): void => {
	sendMail(
		email,
		'Confirm email reset for Hypertube-account',
		`<h1>Hi, here you can confirm email reset!</h1>
			<p>Visit the link below to reset your email:</p>
			<a href='${process.env.REACT_APP_FRONTEND_URL}/update_email?update=${newUpdateRequest.token}'>Reset email here</a>
			<p>Link will be active until ${newUpdateRequest.expiresAt}.</p>
			<p>Ignore this message if you haven't requested email reset.</p>

			<p> See you at Hypertube! <3 </p>`
	);
};

export const changeUserEmail = async (emailResetRequest: EmailUpdateRequest): Promise<void> => {
	await updateUserEmail(emailResetRequest.userId, emailResetRequest.email);
	await removeUpdateEmailRequestByUserId(emailResetRequest.userId);
	await updateSessionEmailByUserId(emailResetRequest.userId, emailResetRequest.email);
};
