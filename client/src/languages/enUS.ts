import { Dictionary } from '../types';

export const enUS: Dictionary = {
	main: 'Main page',

	// Text Fields
	textFieldUsername: 'Username',
	textFieldPassword: 'Password',
	textFieldEmail: 'Email',
	textFieldFirstName: 'First Name',
	textFieldLastName: 'Last Name',
	passwordTooltip:
		'Password should be at least 8 characters long, contain at least one uppercase and lowercase letter, number and symbols',

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
	incorrectField: 'Incorrect field'

	// Backend Errors
};
