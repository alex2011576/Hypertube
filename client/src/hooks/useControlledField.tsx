import { SetStateAction, useState } from 'react';
import { useErrorTranslate } from './useErrorTranslate';

export const useControlledField = (
	type: string,
	fetchedValue: string,
	label: JSX.Element,
	validationFn: (value: string) => string | undefined
) => {
	const { errorTranslate } = useErrorTranslate();
	let [value, setValue] = useState<string>(fetchedValue);

	const onChange = (event: { target: { value: SetStateAction<string> } }) => {
		setValue(event.target.value);
	};

	let errorMessage;
	if (value) errorMessage = errorTranslate(validationFn(value)!);
	if (!value && fetchedValue) errorMessage = errorTranslate('profileRequiredField');

	return {
		type,
		value,
		label,
		onChange,
		error: !!errorMessage,
		helperText: errorMessage || ' '
	};
};
