import { Dictionary } from '../types';

export const svSE: Dictionary = {
	main: 'Huvudsida',

	// Text Fields
	textFieldUsername: 'Användarnamn',
	textFieldPassword: 'Lösenord',
	textFieldConfirmPassword: 'Bekräfta lösenord',
	textFieldEmail: 'E-post',
	textFieldFirstName: 'Förnamn',
	textFieldLastName: 'Efternamn',
	passwordTooltip:
		'Lösenordet ska vara minst 8 tecken lång, innehålla minst en stor och liten bokstav, siffror och symboler',
	textFieldReview: 'Lämna din recension',

	// Checkbox
	showPassword: 'Visa lösenord',
	showPasswords: 'Visa lösenord',

	// Login Form
	orDivider: 'ELLER',
	titleLogin: 'LOGGA IN',
	troubleLoggingIn: 'Glömt lösenordet?',
	buttonLogin: 'LOGGA IN',
	newToLink: 'Ny på Hypertube?',
	signupNow: 'Bli medlem nu!',
	logInWith42: 'Logga in med 42',
	logInWithGithub: 'Logga in med Github',

	// Signup Form
	titleSignup: 'BLI MEDLEM',
	titleResetPassword: 'ÅTERSTÄLL LÖSENORD',
	signupButton: 'BLI MEDLEM',
	signupAlready: 'Redan en medlem?',
	signupLogin: 'Logga in',

	// Forgot Password Form
	forgotPasswordInfoText:
		'Ange din e-postadress så skickar vi dig en länk för att återställa ditt lösenord.',
	forgotPasswordButton: 'SKICKA',
	forgotPasswordBackLogin: 'Tillbaka till inloggning',
	forgotPasswordSignup: 'Bli medlem',
	passwordResetSignup: 'Har du inget konto? Bli medlem',
	passwordResetSubmitButton: 'SPARA',

	// Set Password Form
	setPasswordTitle: 'VÄLJ LÖSENORD',
	setPasswordInfoText:
		'Spara ditt lösenord för Hypertube för att kunna logga in med ditt användarnamn och lösenord vid behov.',
	submitBtn: 'SKICKA',
	alertSuccessSetPassword: 'Tack, lösenordet har sparats.',
	alertErrorSetPassword: 'Det gick inte att spara lösenordet, försök igen',

	// Profile Form
	titleProfile: 'KONTOINSTÄLLNINGAR',
	profileButtonUpdate: 'SPARA ÄNDRINGAR',
	profileUpdateToolTip: 'Fyll i alla obligatoriska fält',
	profileRequiredField: 'Obligatoriskt fält',
	profileImageUpload: 'Klicka för att ladda upp ny bild.',
	profileImageTypography:
		'(Jpeg, jpg eller png\nMinimum 100 x 100 pixlar\nMaximum 6000x4000 pixlar\nMax 25Mb)',
	profileButtonChangeEmail: 'ÄNDRA E-POST',
	profileButtonChangePassword: 'ÄNDRA LÖSENORD',
	profileButtonSetPassword: 'STÄLL IN LÖSENORD',
	profielButtonCancel: 'AVBRYT',
	profielButtonSend: 'SKICKA',
	profileEmailTitle: 'Ändra e-post',
	profileEmailInfoText:
		'Aktiveringslänk kommer att skickas till den angivna e-postadressen. Följ länken från vårt meddelande för att ange din nya e-postadress.',
	profilePasswordTitle: 'Ändra lösenord',
	profilePasswordInfoText: 'Vänligen ange ditt nuvarande lösenord för att säkert ändra det.',
	textFieldCurrentPassword: 'Nuvarande lösenord',
	textFieldNewPassword: 'Nytt lösenord',
	profileFormSuccess: 'Profilinställningar har uppdaterats!',
	profileFormError: 'Det gick inte att uppdatera profilinställningar. Var god försök igen.',
	profileLoadingError:
		'Det gick inte att läsa in sidan med kontoinställningar, försök igen senare.',
	profileUpdatePasswordSuccess: 'Lösenordet har uppdaterats!',
	profileUpdatePasswordError: 'Det gick inte att uppdatera lösenorder. Var god försök igen.',
	profileUpdateEmailSuccess: 'Aktiveringslänk skickad till ny e-post!',
	profileUpdateEmailError:
		'Det gick inte att uppdatera e-postadressen. Var god försök igen.',

	// Public Profile
	publicProfileHeader: 'HYPERTUBER',

	// Navbar
	navbarLogin: 'Logga in',
	navbarSignup: 'Bli medlem',
	navbarLogout: 'LOGGA UT',
	navbarProfile: 'PROFIL',

	// Validations
	invalidUsernameLength: 'Ogiltigt längd, 4-21 tecken',
	invalidUsername: 'Ogiltigt användarnamn',
	passwordLength: 'längd: 8-42 tecken',
	invalidPassword: 'Kontrollera lösenordet',
	invalidEmail: 'Ogiltigt e-postformat',
	incorrectField: 'Ogiltigt fält',
	tooLongInput: 'Max 300 tecken',

	// Movies
	moviesError: 'Ett fel uppstod, försök igen',

	//SearchField
	reverse: 'Omvänd',

	//Plot
	plot: 'PLOT',

	//Creators
	director: 'Regisserad av',
	writer: 'Skriven av',
	actors: 'Skådespelare',

	//Reviews
	reviews: 'RECENSIONER',

	//ReviewForm
	sendReview: 'SKICKA',

	// Alerts
	alertLogout: 'Loggade ut',
	alertSuccessPasswordResetLink: 'Återställ länk skickad! Kontrollera din inkorg.',
	alertErrorPasswordResetLink: 'Det gick inte att skicka länken. Var god försök igen.',
	alertLoginSuccess: 'Inloggad. Välkommen!',
	alertLoginSuccessPasswordNotSet: 'Inloggad. Vänligen ange ditt lösenord.',
	alertLoginError: 'Kunde inte logga in. Var god försök igen.',
	alertAccountActivated: 'Kontot har aktiverats!',
	alertErrorOccured: 'Ett fel uppstod, försök igen.',
	alertNewUserSuccess: 'Ny användare har skapats! Aktiveringslänk skickat till e-post.',
	alertNewUserError: 'Det gick inte att skapa en ny användare. Var god försök igen.',
	alertInvalidPasswordResetLink: 'Ogiltig återställningslänk. Var god försök igen.',
	alertPasswordResetSuccess: 'Lösenordet har ändrats!',
	alertPasswordResetError: 'Det gick inte att återställa lösenordet. Var god försök igen.',
	alertMissingMovieId: 'Film-id saknas',
	alertPostReviewError: 'Ett fel uppstod, försök igen.',

	// AxiosError
	axiosNetworkError: 'Nätverksfel',

	// AuthError
	authError: 'Sessionen har löpt ut, vänligen logga in igen.',

	// Backend Errors -----------------------------------------------------------------------

	// ParseUsername
	usernameNotString: 'Användarnamn ogiltig typ',
	usernameMissing: 'Användarnamn saknas',
	usernameTooShort: 'Användarnamn för kort',
	usernameTooLong: 'Användarnamn för långt',
	usernameInvalid: 'Användarnamn ogiltigt',

	// ParseEmail
	emailNotString: 'E-post ogiltig typ',
	emailMissing: 'E-post saknas',
	emailInvalid: 'E-post ogiltigt',

	// ParsePassword
	passwordNotString: 'Lösenord ogiltig typ',
	passwordTooShort: 'Lösenord för kort',
	passwordTooLong: 'Lösenord för långt',
	passwordWeak: 'Lösenord för svagt',

	// ParseFirstName
	firstNameNotString: 'Förnamn ogiltig typ',
	firstNameMissing: 'Förnamn saknas',
	firstNameTooLong: 'Förnamn för långt',
	firstNameInvalid: 'Förnamn ogiltigt',

	// ParseLastName
	lastNameNotString: 'Efternamn ogiltig typ',
	lastNameMissing: 'Efternamn saknas',
	lastNameTooLong: 'Efternamn för långt',
	lastNameInvalid: 'Efternamn ogiltigt',

	// ParsePasswordToken
	tokenPasswordNotString: 'Token ogiltig typ',
	tokenPasswordMissing: 'Token saknas',
	tokenPasswordResetInvalid: 'Lösenordsåterställningstoken är ogiltig',
	tokenPasswordResetInvalidFormat: 'Lösenordsåterställningskodformat är ogiltigt',

	// ParseEmailToken
	tokenEmailNotString: 'Token ogiltig typ',
	tokenEmailMissing: 'Token saknas',
	tokenEmailInvalid: 'E-poständringstoken är ogiltig',
	tokenEmailInvalidFormat: 'E-poständringskodformat är ogiltigt',

	// imageValidation
	imageInvalidFormat: 'Ogiltigt bildformat! Bilden är inte en bilddata-URI',
	imageInvalidType:
		'Ogiltigt bildformat! Tillåtna typer: "image/jpeg", "image/png", "image/jpg"',
	ImageSizeTooBig: 'Ogiltigt bildformat! Bilden är för stor: max 25mb',
	imageCorrupted: 'Ogiltigt bildformat! Bilden är korrupt',
	imageTooSmall: 'Ogiltigt bildformat! Bilden är för liten. Minst 10x10 pixlar',
	imageTooBig: 'Ogiltigt bildformat! Bilden är för stor. Max 6000x4000 pixlar',
	imageAspectRatio: 'Ogiltigt bildformat! Bilden har ett oacceptabelt bildformat',

	// middleware.ts
	sessionTokenMissing: 'Åtkomst nekad, ingen token försedd',
	sessionNotFound: 'Inga sessioner hittades eller har löpt ut',

	// userRepository.ts
	userNameExists: 'Användarnamn existerar redan',
	emailExists: 'Denna e-post har redan använts',

	// routes/movies.ts
	movieMovieNotFound: 'Filmen hittades inte',
	moviesUserNotLoggedIn: 'Användaren är inte inloggad',
	errorParsingSearchQuery: 'Error parsing search query',
	movieReviewsNotFound: 'Recensioner hittades inte',
	movieReviewsPageInvalidType: 'Ogiltig sidtyp',

	// validator/reviewPayloadValidators.ts
	movieReviewTextNotString: 'Recensiontext ogiltig typ',
	movieReviewTextMissing: 'Recensionstext saknas',
	movieReviewTextTooLong: 'Recensionstexten är för lång',
	movieReviewRatingNotNumber: 'Recensionsbetyg ogiltig typ',
	movieReviewRatingMissing: 'Recensionsbetyg saknas',
	movieReviewRatingOutOfRange: 'Recensionenbetyg utanför intervall (0–5)',
	movieMovieIdMissing: 'Film-id saknas',

	// routes/users.ts
	usersForgotPasswordMissingToken: 'Saknar återställningskod',
	usersForgotPasswordInvalidToken: 'Ogiltig återställningslänk. Var god försök igen',
	usersForgotPasswordMissingOrExpired:
		'Koden för återställning av lösenord saknas eller har upphört att gälla. Var god försök igen.',
	usersNoRightsToUpdate: 'Inga rättigheter att uppdatera profildata',
	usersNoRightsToGet: 'Inga rättigheter att få profildata',
	usersUserNotFound: 'Användaren finns inte',
	usersUpdateEmailMissingToken: 'Saknar återställningskod',
	usersUpdateEmailInvalidToken: 'Ogiltig återställningslänk. Var god försök igen',
	usersPasswordsDoNotMatch: 'Lösenorden matchar inte',
	// services/users.ts
	usersActivationCodeMissing: 'Återställningskoden finns inte',
	usersAccountAlreadyActivated: 'Kontot är redan aktiverat',
	usersEmailNotFound: 'Det gick inte att hitta den här e-postadressen.',
	usersAccountNotActivated: 'Kontot är inte aktiverat, aktivera kontot först.',
	usersErrorCreatingResetLink: 'Det gick inte att skapa återställningslänk, försök igen',
	usersWrongOldPassword: 'Fel gammalt lösenord, försök igen',
	usersProvideNewEmail: 'Ange ett nytt e-postadress',
	usersEmailTaken:
		'Den här e-postadressen är redan tagen. Försök med en annan e-postadress.',

	// login.ts
	loginUserNotFound: 'Användaren hittades inte',
	loginWrongPassword: 'Fel lösenord',
	loginAccountNotActivated: 'Kontot är inte aktivt',
	loginForeignStateRequest: 'Främmande state i begärd förfrågan',

	//error.ts
	errorUnknownEndpoint: 'Okänd slutpunkt'
};
