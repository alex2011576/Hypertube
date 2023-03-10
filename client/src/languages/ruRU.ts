import { Dictionary } from '../types';

export const ruRU: Dictionary = {
	main: 'Главная страница',

	// Text Fields
	textFieldUsername: 'Имя пользователя',
	textFieldPassword: 'Пароль',
	textFieldConfirmPassword: 'Подтвердите пароль',
	textFieldEmail: 'Имейл адрес',
	textFieldFirstName: 'Имя',
	textFieldLastName: 'Фамилия',
	passwordTooltip:
		'Длина пароля минимум 8 символов, должен содержать одну заглавную и одну строчную букву, цифру и символ.',
	textFieldReview: 'Оставить рецензию',

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

	// Set Password Form
	setPasswordTitle: 'СОЗДАТЬ ПАРОЛЬ',
	setPasswordInfoText:
		'Cохраните пароль для Hypertube. Так по-необходимости Вы сможете войти используя имя пользователя и пароль.',
	submitBtn: 'OK',
	alertSuccessSetPassword: 'Спасибо, пароль сохранен.',
	alertErrorSetPassword: 'Ошибка, пожалуйста попробуйте снова',

	// Profile Form
	titleProfile: 'НАСТРОЙКИ ПРОФИЛЯ',
	profileButtonUpdate: 'ОБНОВИТЬ',
	profileUpdateToolTip: 'Пожалуйста заполните обязательные поля',
	profileRequiredField: 'Обязательное поле',
	profileImageUpload: 'Кликни чтоб обновить фото.',
	profileImageTypography:
		'(Jpeg, jpg or png\nМинимум 100 x 100 пикс.\nМаксимум 6000x4000 пикс.\nФайл не более 25Мб)',
	profileButtonChangeEmail: 'ИЗМЕНИТЬ ИМЕЙЛ',
	profileButtonChangePassword: 'ИЗМЕНИТЬ ПАРОЛЬ',
	profileButtonSetPassword: 'УСТАНОВИТЬ ПАРОЛЬ',
	profielButtonCancel: 'ОТМЕНА',
	profielButtonSend: 'ОК',
	profileEmailTitle: 'Изменить имейл',
	profileEmailInfoText:
		'Ссылка для активации будет выслана на указанный имейл адрес. Пожалуйста пройдите по ссылке чтобы сменить имейл адрес.',
	profilePasswordTitle: 'Изменить пароль',
	profilePasswordInfoText: 'Введите текущий пароль для безопасной смены пароля.',
	textFieldCurrentPassword: 'Текущий пароль',
	textFieldNewPassword: 'Новый пароль',
	profileFormSuccess: 'Профиль успешно обновлен!',
	profileFormError: 'Ошибка в процессе обновления профиля. Пожалуйста попробуйте снова',
	profileLoadingError: 'Ошибка загрузки страницы, Пожалуйста попробуйте снова...',
	profileUpdatePasswordSuccess: 'Пароль успешно изменен!',
	profileUpdatePasswordError: 'Ошибка в процессе смены пароля. Пожалуйста попробуйте снова.',
	profileUpdateEmailSuccess: 'Ссылка активации выслана на новый имейл адрес!',
	profileUpdateEmailError:
		'Ошибка в процессе обновления имейл адреса. Пожалуйста попробуйте снова.',

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
	tooLongInput: 'Максимум 300 символов',
	emptyField: 'Пустое поле',

	// Movies
	moviesError: 'Произошла ошибка, Пожалуйста попробуйте снова',

	//SearchField
	search: 'Поиск',
	reverse: 'Реверс',

	//Plot
	plot: 'СЮЖЕТ',

	//Creators
	director: 'Режиссер',
	writer: 'Сценарист',
	actors: 'Актеры',

	//Reviews
	reviews: 'ОТЗЫВЫ',

	//ReviewForm
	sendReview: 'ОТПРАВИТЬ',

	// Alerts
	alertLogout: 'Выход осуществлен',
	alertSuccessPasswordResetLink: 'Ссылка выслана! Пожалуйста проверьте почтовый ящик.',
	alertErrorPasswordResetLink: 'Произошла ошибка. Пожалуйста попробуйте снова.',
	alertLoginSuccess: 'Вход осуществлен. Добро пожаловать!',
	alertLoginSuccessPasswordNotSet: 'Успешный вход. Пожалуйста установите пароль.',
	alertLoginError: 'Ошибка входа Пожалуйста попробуйте снова.',
	alertAccountActivated: 'Аккаунт успешно активирован!',
	alertErrorOccured: 'Произошла ошибка, Пожалуйста попробуйте снова.',
	alertNewUserSuccess:
		'Новый пользователь успешно создан! Ссылка активации выслана на указанный имейл адрес.',
	alertNewUserError: 'Ошибка в процессе создания аккаунта. Пожалуйста попробуйте снова.',
	alertInvalidPasswordResetLink: 'Неверная ссылка. Пожалуйста попробуйте снова.',
	alertPasswordResetSuccess: 'Пароль успешно изменен!',
	alertPasswordResetError: 'Не получилось сменить пароль. Пожалуйста попробуйте снова.',
	alertMissingMovieId: 'Номер фильма отсутствует',
	alertPostReviewError: 'Произошла ошибка, попробуйте снова.',

	// AxiosError
	axiosNetworkError: 'Ошибка подключения',

	// AuthError
	authError: 'Сессия истекла, пожалуйста войдите снова.',

	// Backend Errors -----------------------------------------------------------------------

	// ParseUsername
	usernameNotString: 'Неверный тип строки: Имя пользователя',
	usernameMissing: 'Отсутствует имя пользователя',
	usernameTooShort: 'Слишком короткое имя пользователя',
	usernameTooLong: 'Слишком длинное имя пользователя',
	usernameInvalid: 'Неверный формат',

	// ParseEmail
	emailNotString: 'Неверный тип строки: Имейл',
	emailMissing: 'Отсутствует имейл',
	emailInvalid: 'Неверный формат',

	// ParsePassword
	passwordNotString: 'Неверный тип строки: Пароль',
	passwordTooShort: 'Слишком короткий пароль',
	passwordTooLong: 'Слишком длинный пароль',
	passwordWeak: 'Слабый пароль',

	// ParseFirstName
	firstNameNotString: 'Неверный тип строки: Имя',
	firstNameMissing: 'Отсутсвует имя',
	firstNameTooLong: 'Слишком длинное имя',
	firstNameInvalid: 'Неверный формат: Имя',

	// ParseLastName
	lastNameNotString: 'Неверный тип строки: Фамилия',
	lastNameMissing: 'Отсутствует фамилия',
	lastNameTooLong: 'Слишком длинная фамилия',
	lastNameInvalid: 'Неверный формат: Фамилия',

	// ParsePasswordToken
	tokenPasswordNotString: 'Неверный тип строки: Токен',
	tokenPasswordMissing: 'Токен отсутствует',
	tokenPasswordResetInvalid: 'Неверный токен для смены пароля',
	tokenPasswordResetInvalidFormat: 'Формат кода для смены пароля неверен',

	// ParseEmailToken
	tokenEmailNotString: 'Неверный тип строки: Токен',
	tokenEmailMissing: 'Токен отсутствует',
	tokenEmailInvalid: 'Неверный токен для смены имейла',
	tokenEmailInvalidFormat: 'Формат кода для смены имейла неверен',

	// imageValidation
	imageInvalidFormat: 'Неверный формат изображения.',
	imageInvalidType:
		'Неверный формат изображения! Валидный формат: "image/jpeg", "image/png", "image/jpg"',
	ImageSizeTooBig: 'Неверный формат изображения! Больше 25Мб',
	imageCorrupted: 'Неверный формат изображения!',
	imageTooSmall: 'Неверный формат изображения. Минимальный размер сторон 10x10 пикс',
	imageTooBig: 'Неверный формат изображения! Максимальный размер сторон 6000x4000 пикс',
	imageAspectRatio: 'Неверный формат изображения! Некорректное разрешение.',

	// middleware.ts
	sessionTokenMissing: 'Доступ ограничен, отсутствует токен',
	sessionNotFound: 'Сессия устарела',

	// userRepository.ts
	userNameExists: 'Имя пользователя занято',
	emailExists: 'Этот адрес уже занят',

	// routes/movies.ts
	movieMovieNotFound: 'Фильм не найден.',
	moviesUserNotLoggedIn: 'Пожалуйста войдите в свой аккаунт',
	errorParsingSearchQuery: 'Ошибка обрботки поискового запроса',
	movieReviewsNotFound: 'Отзывов не найдено',
	movieReviewsPageInvalidType: 'Неверный номер страницы',

	// validator/reviewPayloadValidators.ts
	movieReviewTextNotString: 'Неверный формат',
	movieReviewTextMissing: 'Пустой текст',
	movieReviewTextTooLong: 'Слишком длинное ревью',
	movieReviewRatingNotNumber: 'Неверный тип: Рейтинг',
	movieReviewRatingOutOfRange: 'Рейтинг должен быть между 0 и 5',
	movieMovieIdMissing: 'ID фильма не найден',

	// routes/users.ts
	usersForgotPasswordMissingToken: 'Код активации отсутствует',
	usersForgotPasswordInvalidToken: 'Неверная ссылка. Пожалуйста попробуйте снова.',
	usersForgotPasswordMissingOrExpired:
		'Код для смены пароля отсутсвует или неверен. Пожалуйста попробуйте снова.',
	usersNoRightsToUpdate: 'Нет прав для смены настроек',
	usersNoRightsToGet: 'Нет прав для получения информации',
	usersUserNotFound: 'Пользователь не существует',
	usersUpdateEmailMissingToken: 'Код активации отсутствует',
	usersUpdateEmailInvalidToken: 'Неверная ссылка.. Пожалуйста попробуйте снова.',
	usersPasswordsDoNotMatch: 'Passwords do not match',
	// services/users.ts
	usersActivationCodeMissing: 'Такого кода активации не существует.',
	usersAccountAlreadyActivated: 'Аккаунт уже активирован',
	usersEmailNotFound: 'Имейл адрес не найдет.',
	usersAccountNotActivated: 'Пожалуйста активируйте аккаунт.',
	usersErrorCreatingResetLink:
		'Ошибка в процессе формирования ссылки для сброса. Пожалуйста попробуйте снова',
	usersWrongOldPassword: 'Неверный старый пароль, Пожалуйста попробуйте снова',
	usersProvideNewEmail: 'Пожалуйста введите новый имейл адрес',
	usersEmailTaken: 'Этот адрес уже занят.',

	// login.ts
	loginUserNotFound: 'Пользовател не найден',
	loginWrongPassword: 'Неверный пароль',
	loginAccountNotActivated: 'Аккаунт не активирован',
	loginForeignStateRequest: 'Неизвестный статус',

	//error.ts
	errorUnknownEndpoint: 'Неизвестный путь',
	errorUnexpectedError: 'Неожиданная ошибка',
	errorDatabase: 'Не удалось получить доступ к базе данных',

	//streaming apis
	streamingInvalidImdb: 'Неверный идентификатор imdb',
	streamingInvalidQuality: 'Недопустимый параметр качества',
	streamingRangeNotProvided: 'Range не указан',
	streamingSearchInDownload: 'Failed to access downloads data in database',
	streamingRecordDownload: 'Не удалось получить доступ к данным о загрузках',
	torrentSelfDestruction: 'Торрент-движок не смог скачать файлы',
	torrentNotTorrents: 'На данный момент нет доступных торрентов для фильма',
	torrentNotTorrentsWithQuality: 'Выбранное качество в настоящее время недоступно',
	torrentNotSupported: 'Предоставленные торрент-файлы не поддерживаются',
	streamingBeforeStatus: `Неудачная трансляция! Сначала нужно сделать запрос статуса стрима!`,

	//oAuth errors
	oAuthLoginFailed: 'Сбой стратегии аутентификации',

	//subtitles.ts
	invalidImdbId: 'Неверный Imdb код',
	noSubtitlesFile: 'Файлы субтитров не найдены',
	noSubtitles: 'Субтитры не найдены',
	wrongLanguage: 'Выбран несуществующий язык'
};
