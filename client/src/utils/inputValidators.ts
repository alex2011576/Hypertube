export const validateUsername = (input: string) => {
	let trimmedInput = input.trim();

	if (trimmedInput.length < 4 || input.length > 21) {
		return 'Too short (Length: 4-21 characters)';
	}
	const usernameRegex = /^[a-zA-Z0-9_\-.ÄÖäöÅåßÜü]{4,21}$/;
	if (!usernameRegex.test(trimmedInput)) {
		return 'Invalid username';
	}
	return undefined;
};

export const validatePassword = (input: string) => {
	if (input.length < 8 || input.length > 42) {
		return 'Length: 8-42 characters';
	}
	const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,42})/;
	if (!passwordRegex.test(input)) {
		return 'Check the input';
	}
	return undefined;
};

export const validateEmail = (input: string) => {
	let trimmedInput = input.trim();
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!emailRegex.test(trimmedInput)) {
		return 'Incorrect email format';
	}
	return undefined;
};

export const validateFirstname = (input: string) => {
	let trimmedInput = input.trim();
	const nameRegex = /^[a-zA-Z'\-ÄÖäöÅåßÜü\s]{1,21}$/;
	if (!nameRegex.test(trimmedInput)) {
		return 'Incorrect field';
	}
	return undefined;
};

export const validateLastname = (input: string) => {
	let trimmedInput = input.trim();
	const nameRegex = /^[a-zA-Z'\-ÄÖäöÅåßÜü\s]{1,41}$/;
	if (!nameRegex.test(trimmedInput)) {
		return 'Incorrect field';
	}
	return undefined;
};

export const validateSignUpForm = (
	username: string,
	email: string,
	password: string,
	firstname: string,
	lastname: string
) => {
	return !validateUsername(username) &&
		!validateEmail(email) &&
		!validatePassword(password) &&
		!validateFirstname(firstname) &&
		!validateLastname(lastname)
		? true
		: false;
};

export const validateLoginForm = (username: string, password: string) => {
	return !validateUsername(username) && !validatePassword(password) ? true : false;
};

export const validateUpdatePasswordForm = (oldPassword: string, newPassword: string) => {
	return !validatePassword(oldPassword) && !validatePassword(newPassword) ? true : false;
};
