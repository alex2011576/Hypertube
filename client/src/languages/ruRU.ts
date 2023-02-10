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

	// Backend Errors

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
};
