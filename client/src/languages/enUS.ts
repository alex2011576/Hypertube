import { Dictionary } from '../types';

export const enUS: Dictionary = {
	main: 'Main page',

	// Text Fields
	textFieldUsername: 'Username',
	textFieldPassword: 'Password',
	textFieldConfirmPassword: 'Confirm Password',
	textFieldEmail: 'Email',
	textFieldFirstName: 'First Name',
	textFieldLastName: 'Last Name',
	passwordTooltip:
		'Password should be at least 8 characters long, contain at least one uppercase and lowercase letter, number and symbols',
	textFieldReview: 'Leave your review',
	// Checkbox
	showPassword: 'Show password',
	showPasswords: 'Show passwords',

	// Login Form
	orDivider: 'OR',
	titleLogin: 'LOG IN',
	troubleLoggingIn: 'Forgot password?',
	buttonLogin: 'LOG IN',
	newToLink: 'New to Hypertube?',
	signupNow: 'Sign up now!',
	logInWith42: 'Sign in with 42',
	logInWithGithub: 'Sign in with Github',

	// Signup Form
	titleSignup: 'SIGN UP',
	titleResetPassword: 'RESET PASSWORD',
	signupButton: 'SIGN UP',
	signupAlready: 'Already a member?',
	signupLogin: 'Log in',

	// Forgot Password Form
	forgotPasswordInfoText:
		"Enter your email address and we'll send you a link to reset your password.",
	forgotPasswordButton: 'SEND',
	forgotPasswordBackLogin: 'Back to sign in ',
	forgotPasswordSignup: 'Sign Up',
	passwordResetSignup: "Don't have an account? Sign Up",
	passwordResetSubmitButton: 'SUBMIT',

	// Set Password Form
	setPasswordTitle: 'SET PASSWORD',
	setPasswordInfoText:
		'Save your password for Hypertube to be able to login with your username and password if needed.',
	submitBtn: 'SUBMIT',
	alertSuccessSetPassword: 'Thank you, password has been saved.',
	alertErrorSetPassword: 'Error setting password, please try again',

	// Profile Form
	titleProfile: 'PROFILE SETTINGS',
	profileButtonUpdate: 'UPDATE PROFILE',
	profileUpdateToolTip: 'Please fill all the required fields',
	profileRequiredField: 'Required field',
	profileImageUpload: 'Click to upload new image.',
	profileImageTypography:
		'(Jpeg, jpg or png\nMinimum 100 x 100 pixels\nMaximum 6000x4000 pixels\nMax 25Mb)',
	profileButtonChangeEmail: 'CHANGE EMAIL',
	profileButtonChangePassword: 'CHANGE PASSWORD',
	profileButtonSetPassword: 'SET PASSWORD',
	profielButtonCancel: 'CANCEL',
	profielButtonSend: 'SEND',
	profileEmailTitle: 'Change email',
	profileEmailInfoText:
		'Activation link will be sent to the email address provided.Please follow the link from our message in order to set your new email address.',
	profilePasswordTitle: 'Change password',
	profilePasswordInfoText:
		'Please enter your current password in order to safely change it.',
	textFieldCurrentPassword: 'Current Password',
	textFieldNewPassword: 'New Password',
	profileFormSuccess: 'Profile settings were updated!',
	profileFormError: 'Unable to update profile settings. Please try again.',
	profileLoadingError: 'Error loading account settings page, please try again...',
	profileUpdatePasswordSuccess: 'Password was changed successfully!',
	profileUpdatePasswordError: 'Unable to update password. Please try again.',
	profileUpdateEmailSuccess: 'Activation link sent to new email!',
	profileUpdateEmailError: 'Unable to update email address. Please try again.',

	// Public Profile
	publicProfileHeader: 'HYPERTUBER',

	// Navbar
	navbarLogin: 'LOGIN',
	navbarSignup: 'SIGN UP',
	navbarLogout: 'LOGOUT',
	navbarProfile: 'PROFILE',

	// Validations
	invalidUsernameLength: 'Too short (Length: 4-21 characters)',
	invalidUsername: 'Invalid username',
	passwordLength: 'Length: 8-42 characters',
	invalidPassword: 'Check the input',
	invalidEmail: 'Incorrect email format',
	incorrectField: 'Incorrect field',
	tooLongInput: 'Maximum 300 characters',
	emptyField: 'Empty field, note that we are removing trailing spaces',

	// Movies
	moviesError: 'Error occurred, please try again',

	//SearchField
	reverse: 'Reverse',

	//Plot
	plot: 'PLOT',

	//Creators
	director: 'Directed by',
	writer: 'Written by',
	actors: 'Cast',

	//Reviews
	reviews: 'WHAT ARE PEOPLE SAYING?',

	//ReviewForm
	sendReview: 'SEND',

	// Alerts
	alertLogout: 'Logged out',
	alertSuccessPasswordResetLink: 'Reset link sent! Please check your inbox.',
	alertErrorPasswordResetLink: 'Unable to send a link. Please try again.',
	alertLoginSuccess: 'Logged in successfully. Welcome!',
	alertLoginSuccessPasswordNotSet: 'Logged in successfully. Please set your password.',
	alertLoginError: 'Unable to login. Please try again.',
	alertAccountActivated: 'Account activated successfully!',
	alertErrorOccured: 'Error occurred, please try again.',
	alertNewUserSuccess: 'New user has been created! Activation link is sent to email.',
	alertNewUserError: 'Unable to create a new user. Please try again.',
	alertInvalidPasswordResetLink: 'Invalid reset link. Please try again.',
	alertPasswordResetSuccess: 'Password changed successfully!',
	alertPasswordResetError: 'Unable to reset password. Please try again.',
	alertMissingMovieId: 'Missing movie id',
	alertPostReviewError: 'Error sending a review, please try again.',

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

	// imageValidation
	imageInvalidFormat: 'Invalid images format! Image is not an Image Data URI',
	imageInvalidType:
		'Invalid images format! Allowed types: "image/jpeg", "image/png", "image/jpg"',
	ImageSizeTooBig: 'Invalid images format! Image is too big: 25mb max',
	imageCorrupted: 'Invalid images format! Image is corrupted',
	imageTooSmall: 'Invalid images format! Image is too small. Min 10x10 pixels',
	imageTooBig: 'Invalid images format! Image is too big. Max 6000x4000 pixels',
	imageAspectRatio: 'Invalid images format! Image is of unacceptable ratio.',

	// middleware.ts
	sessionTokenMissing: 'Access denied, no token provided',
	sessionNotFound: 'No sessions found or expired',

	// userRepository.ts
	userNameExists: 'Username already exists',
	emailExists: 'This email was already used',

	// routes/movies.ts
	movieMovieNotFound: 'Movie not found.',
	moviesUserNotLoggedIn: 'User is not logged in',
	errorParsingSearchQuery: 'Error parsing search query',
	movieReviewsNotFound: 'Reviews not found',
	movieReviewsPageInvalidType: 'Invalid page type',

	// validator/reviewPayloadValidators.ts
	movieReviewTextNotString: 'Review text invalid type',
	movieReviewTextMissing: 'Review text is missing',
	movieReviewTextTooLong: 'Review text is too long',
	movieReviewRatingNotNumber: 'Review rating invalid type',
	movieReviewRatingOutOfRange: 'Review rating is out of range (0 - 5)',
	movieMovieIdMissing: 'Movie id is missing',

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
	usersPasswordsDoNotMatch: 'Passwords do not match',
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
	errorUnexpectedError: 'Unexpected error',
	errorUnknownEndpoint: 'Unknown endpoint',
	errorDatabase: 'Failed to access database',//new

	//streaming apis all new
	streamingInvalidImdb: 'Invalid imdb id',
	streamingInvalidQuality: 'Invalid quality parameter',
	streamingRangeNotProvided: 'Range is not provided',
	streamingSearchInDownload: 'Failed to access downloads data in database',
	streamingRecordDownload: 'Failed to record new downloads in database',
	torrentSelfDestruction: 'Torrent engine failed to download files',
	torrentNotTorrents: 'No torrents are currently avaliable for the movie',
	torrentNotTorrentsWithQuality: 'Chosen quality in currently unavaliable',
	torrentNotSupported: 'Provided torrent files are not supported',
	streamingBeforeStatus: `Failure to stream! Make status request first!`,

	//oAuth errors
	oAuthLoginFailed: 'Authentication strategy failure'

};
