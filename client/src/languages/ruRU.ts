import { Dictionary } from '../types';

export const ruRU: Dictionary = {
	main: 'Главная страница',

	// Text Fields
	textFieldUsername: 'Имя пользователя',
	textFieldPassword: 'Пароль',
	textFieldEmail: 'Имейл адрес',
	textFieldFirstName: 'Имя',
	textFieldLastName: 'Фамилия',
	passwordTooltip:
		'Длина пароля минимум 8 символов, должен содержать одну заглавную и одну строчную букву, цифру и символ.',

	// Checkbox
	showPassword: 'Показать пароль',
	showPasswords: 'Show passwords',

	// Login Form
	orDivider: 'ИЛИ',
	titleLogin: 'ЛОГИН',
	troubleLoggingIn: 'Не помнишь пароль?',
	buttonLogin: 'ВОЙТИ',
	newToLink: 'Здесь впервые?',
	signupNow: 'Зарегистрируйся!',
	logInWith42: 'Войти с 42',
	logInWithGithub: 'Войти с Github',

	// Signup Form
	titleSignup: 'РЕГИСТРАЦИЯ',
	titleResetPassword: 'ВОССТАНОВИТЬ ПАРОЛЬ',
	signupButton: 'ЗАРЕГИСТРИРОВАТЬСЯ',
	signupAlready: 'Уже есть учетная запись?',
	signupLogin: 'Войти',

	// Forgot Password Form
	forgotPasswordInfoText:
		'Введите свой имейл адрес и мы отправим Вам ссылку для восстановления пароля.',
	forgotPasswordButton: 'ОТПРАВИТЬ',
	forgotPasswordBackLogin: 'Обратно к логину',
	forgotPasswordSignup: 'Регистрауция',
	passwordResetSignup: 'Нет аккаута? Зарегистрироваться',
	passwordResetSubmitButton: 'ОК',

	// Profile Form
	titleProfile: 'НАСТРОЙКИ ПРОФИЛЯ',
	profileButtonUpdate: 'ОБНОВИТЬ',
	profileUpdateToolTip: 'Пожалуйста заполни обязательные поля',
	profileRequiredField: 'Обязательное поле',
	profileImageUpload: 'Кликни чтоб обновить фото.',
	profileImageTypography:
		'(Jpeg, jpg or png\nМинимум 100 x 100 пикс.\nМаксимум 6000x4000 пикс.\nФайл не более 25Мб)',
	profileButtonChangeEmail: 'ИЗМЕНИТЬ ИМЕЙЛ',
	profileButtonChangePassword: 'ИЗМЕНИТЬ ПАРОЛЬ',
	profielButtonCancel: 'ОТМЕНА',
	profielButtonSend: 'ОК',
	profileEmailTitle: 'Change email',
	profileEmailInfoText:
		'Ссылка для активации будет выслана на указанный имейл адрес. Пожалуйста пройдите по ссылке чтобы сменить имейл адрес.',
	profilePasswordTitle: 'Изменить пароль',
	profilePasswordInfoText: 'Введите текущий пароль для безопасной смены пароля.',
	textFieldCurrentPassword: 'Текущий пароль',
	textFieldNewPassword: 'Новый пароль',
	profileFormSuccess: 'Profile settings were updated!',
	profileFormError: 'Unable to update profile settings. Please try again.',
	profileLoadingError: 'Error loading account settings page, please try again...',
	profileUpdatePasswordSuccess: 'Password was changed successfully!',
	profileUpdatePasswordError: 'Unable to update password. Please try again.',
	profileUpdateEmailSuccess: 'Activation link sent to new email!',
	profileUpdateEmailError: 'Unable to update email address. Please try again.',

	// Public Profile
	publicProfileHeader: 'ПОЛЬЗОВАТЕЛЬ',

	// Navbar
	navbarLogin: 'ВХОД',
	navbarSignup: 'РЕГИСТРАЦИЯ',
	navbarLogout: 'ВЫХОД',
	navbarProfile: 'ПРОФИЛЬ',

	// Validations
	invalidUsernameLength: 'Длина 4-21 символов',
	invalidUsername: 'Неверный формат',
	passwordLength: 'Длина 8-42 символа',
	invalidPassword: 'Неверный формат',
	invalidEmail: 'Неверный формат',
	incorrectField: 'Неверный формат',

	// Library
	libraryError: 'Error occurred, please try again',

	// Alerts
	alertLogout: 'Logged out',
	alertSuccessPasswordResetLink: 'Reset link sent! Please check your inbox.',
	alertErrorPasswordResetLink: 'Unable to send a link. Please try again.',
	alertLoginSuccess: 'Logged in successfully. Welcome!',
	alertLoginError: 'Unable to login. Please try again.',
	alertAccountActivated: 'Account activated successfully!',
	alertErrorOccured: 'Error occurred, please try again.',
	alertNewUserSuccess: 'New user has been created! Activation link is sent to email.',
	alertNewUserError: 'Unable to create a new user. Please try again.',
	alertInvalidPasswordResetLink: 'Invalid reset link. Please try again.',
	alertPasswordResetSuccess: 'Password changed successfully!',
	alertPasswordResetError: 'Unable to reset password. Please try again.',

	// AxiosError
	axiosNetworkError: 'Network error',

	// AuthError
	authError: 'Session expired, please login again.',

	// Backend Errors -----------------------------------------------------------------------

	// ParseUsername
	usernameNotString: 'Username invalid type',
	usernameMissing: 'Username is missing',
	usernameTooShort: 'Username is too short',
	usernameTooLong: 'Username is too long',
	usernameInvalid: 'Username is invalid',

	// ParseEmail
	emailNotString: 'Email invalid type',
	emailMissing: 'Email is missing',
	emailInvalid: 'Email is invalid',

	// ParsePassword
	passwordNotString: 'Password invalid type',
	passwordTooShort: 'Password is too short',
	passwordTooLong: 'Password is too long',
	passwordWeak: 'Password is too weak',

	// ParseFirstName
	firstNameNotString: 'First name invalid type',
	firstNameMissing: 'First name is missing',
	firstNameTooLong: 'First name is too long',
	firstNameInvalid: 'First name is invalid',

	// ParseLastName
	lastNameNotString: 'Last name invalid type',
	lastNameMissing: 'Last name is missing',
	lastNameTooLong: 'Last name is too long',
	lastNameInvalid: 'Last name is invalid',

	// ParsePasswordToken
	tokenPasswordNotString: 'Token invalid type',
	tokenPasswordMissing: 'Token is missing',
	tokenPasswordResetInvalid: 'Password reset token is invalid',
	tokenPasswordResetInvalidFormat: 'Password reset code format invalid',

	// ParseEmailToken
	tokenEmailNotString: 'Token invalid type',
	tokenEmailMissing: 'Token is missing',
	tokenEmailInvalid: 'Email change token is invalid',
	tokenEmailInvalidFormat: 'Email change code format invalid',

	// userRepository.ts
	userNameExists: 'Username already exists',
	emailExists: 'This email was already used',

	// library.ts
	libraryUserNotLoggedIn: 'User is not logged in',
	libraryLimitOffsetNotNumber: 'Limit and offset should be string represented integers',

	// routes/users.ts
	usersForgotPasswordMissingToken: 'Missing activation code',
	usersForgotPasswordInvalidToken: 'Invalid reset link. Please try again.',
	usersForgotPasswordMissingOrExpired:
		'Reset password code is missing or expired. Please try again.',
	usersNoRightsToUpdate: 'No rights to update profile data',
	usersNoRightsToGet: 'No rights to get profile data',
	usersUserNotFound: "User doesn't exist",
	usersUpdateEmailMissingToken: 'Missing activation code',
	usersUpdateEmailInvalidToken: 'Invalid reset link. Please try again.',
	// services/users.ts
	usersActivationCodeMissing: "Activation code doesn't exist",
	usersAccountAlreadyActivated: 'Account already activated',
	usersEmailNotFound: "Couldn't find this email address.",
	usersAccountNotActivated: 'Account is not active, please activate account first.',
	usersErrorCreatingResetLink: 'Error creating reset link, please try again',
	usersWrongOldPassword: 'Wrong old password, please try again',
	usersProvideNewEmail: 'Please provide new email address',
	usersEmailTaken: 'This email is already taken. Please try another email address.',

	// login.ts
	loginUserNotFound: 'User not found',
	loginWrongPassword: 'Wrong password',
	loginAccountNotActivated: 'Account is not active',
	loginForeignStateRequest: 'Foreign state in request query',

	//error.ts
	errorUnknownEndpoint: 'Unknown endpoint'
};
