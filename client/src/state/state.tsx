import * as locales from '@mui/material/locale';
import { createTheme, Theme } from '@mui/material';
import { createContext, useContext, useReducer } from 'react';
import { dictionaryList } from '../languages';
import { Dictionary, LanguageOption, LoggedUser } from '../types';
import { Action } from './reducer';
import theme from '../theme';
import { parseLanguageOption } from '../utils/languageOptionValidator';

let user: LoggedUser | undefined;
const loggedUserJSON = localStorage.getItem('loggedUser');
user = loggedUserJSON ? JSON.parse(loggedUserJSON) : undefined;

let userLanguage: LanguageOption;
const languageFromLocalStorage: string | null = localStorage.getItem('language');
userLanguage =
	user && user.language
		? parseLanguageOption(user.language)
		: parseLanguageOption(languageFromLocalStorage);

type SupportedLocales = keyof typeof locales;
console.log(userLanguage);
export const themeWithLocale = (userLanguage: LanguageOption) =>
	createTheme(theme, locales[userLanguage as SupportedLocales]);

export type State = {
	loggedUser: LoggedUser | undefined;
	userLanguage: LanguageOption;
	dictionary: Dictionary;
	themeWithLocale: Theme;
};

const initialState: State = {
	loggedUser: user,
	userLanguage: userLanguage,
	dictionary: dictionaryList[userLanguage],
	themeWithLocale: themeWithLocale(userLanguage)
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
	initialState,
	() => initialState
]);

type StateProviderProps = {
	reducer: React.Reducer<State, Action>;
	children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <StateContext.Provider value={[state, dispatch]}>{children}</StateContext.Provider>;
};
export const useStateValue = () => useContext(StateContext);
