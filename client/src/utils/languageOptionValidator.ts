import { LanguageOption } from '../types';

const isLanguageOption = (languageOption: any): languageOption is LanguageOption => {
	return languageOption === 'enUS' || languageOption === 'ruRU' || languageOption === 'svSE';
};

export const parseLanguageOption = (languageOption: unknown): LanguageOption => {
	if (isLanguageOption(languageOption)) return languageOption;
	return 'enUS';
};
