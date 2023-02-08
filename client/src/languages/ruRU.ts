import { Dictionary } from "../types";

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
	incorrectField: 'Неверный формат'

	// Backend Errors
};
