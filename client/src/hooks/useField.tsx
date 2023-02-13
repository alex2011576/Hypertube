import { SetStateAction, useState } from 'react';
import { useTranslate } from './useTranslate';

export const useField = (
	type: string,
	label: JSX.Element,
	validationFn: (value: string) => string | undefined
) => {
	const [value, setValue] = useState('');
	const { translate } = useTranslate();

	const onChange = (event: { target: { value: SetStateAction<string> } }) =>
		setValue(event.target.value);

	let errorMessage;
	if (value !== '') {
		errorMessage = translate(validationFn(value)!);
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
	label: JSX.Element,
	validationFn: (value: string) => string | undefined
) => {
	const [value, setValue] = useState('');
	const { translate } = useTranslate();

	const onChange = (event: { target: { value: SetStateAction<string> } }) =>
		setValue(event.target.value);

	let errorMessage;
	if (value !== '') {
		errorMessage = translate(validationFn(value)!);
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
