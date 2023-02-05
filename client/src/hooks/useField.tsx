import { SetStateAction, useState } from 'react';
import { useErrorTranslate } from './useErrorTranslate';

export const useField = (
	type: string,
	label: JSX.Element,
	validationFn: (value: string) => string | undefined
) => {
	const [value, setValue] = useState('');
	const { errorTranslate } = useErrorTranslate();

	const onChange = (event: { target: { value: SetStateAction<string> } }) =>
		setValue(event.target.value);

	let errorMessage;
	if (value !== '') {
		// Testing Error message translation
		//errorMessage = validationFn(value);
		errorMessage = errorTranslate(validationFn(value)!);
	}
	
	return {
		type,
		label,
		value,
		onChange,
		error: !!errorMessage,
		helperText: errorMessage || ' '
	};
};

export const useFieldWithReset = (
	type: string,
	label: string,
	validationFn: (value: string) => string | undefined
) => {
	const [value, setValue] = useState('');

	const onChange = (event: { target: { value: SetStateAction<string> } }) =>
		setValue(event.target.value);

	let errorMessage;
	if (value !== '') {
		errorMessage = validationFn(value);
	}

	const reset = () => setValue('');

	return {
		type,
		label,
		value,
		onChange,
		reset,
		error: !!errorMessage,
		helperText: errorMessage || ' '
	};
};
