import { useState } from 'react';
import { LanguageOption } from '../types';

export const useToggleButton = (initialValue: string | LanguageOption) => {
	const [value, setValue] = useState(initialValue);

	const onChange = (_event: React.MouseEvent<HTMLElement>, value: string | LanguageOption) => {
		value && setValue(value);
	};
	return {
		value,
		onChange
	};
};

export const useToggleButtonWithSetValue = (initialValue: string) => {
	const [value, setValue] = useState(initialValue);
	const onChange = (_event: React.MouseEvent<HTMLElement>, value: string) => {
		value && setValue(value);
	};
	return {
		value,
		onChange,
		setValue
	};
};
