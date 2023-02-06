import { LanguageOption } from '../types';

const isLanguageOption = (languageOption: any): languageOption is LanguageOption => {
	return (
		languageOption === 'esUS' || languageOption === 'ruRU' || languageOption === 'seSWE'
	);
};

export const validateLanguageOption = (
	languageOption: unknown
): LanguageOption | undefined => {
	if (!languageOption || typeof languageOption !== 'string') return undefined;
	if (isLanguageOption(languageOption)) return languageOption;
};
