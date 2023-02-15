import { SetStateAction, useState } from 'react';
import { useTranslate } from './useTranslate';

export const useControlledField = (
	type: string,
	fetchedValue: string,
	label: JSX.Element,
	validationFn: (value: string) => string | undefined
) => {
	const { translate } = useTranslate();
	let [value, setValue] = useState<string>(fetchedValue);

	const onChange = (event: { target: { value: SetStateAction<string> } }) => {
		setValue(event.target.value);
	};

	let errorMessage;
	if (value) errorMessage = translate(validationFn(value)!);
	if (!value && fetchedValue) errorMessage = translate('profileRequiredField');

	return {
		type,
		value,
		label,
		onChange,
		error: !!errorMessage,
		helperText: errorMessage || ' '
	};
};
