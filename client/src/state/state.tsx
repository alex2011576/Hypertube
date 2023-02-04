import * as locales from '@mui/material/locale';
import { createTheme, Theme } from '@mui/material';
import { createContext, useContext, useReducer } from 'react';
import { dictionaryList } from '../languages';
import { LoggedUser } from '../types';
import { Action } from './reducer';
import theme from '../theme';

let user: LoggedUser | undefined;
const loggedUserJSON = localStorage.getItem('loggedUser');
user = loggedUserJSON ? JSON.parse(loggedUserJSON) : undefined;

let userLanguage: string;
userLanguage = localStorage.getItem('language') || 'enUS';

type SupportedLocales = keyof typeof locales;

export const themeWithLocale = (userLanguage: string) =>
	createTheme(theme, locales[userLanguage as SupportedLocales]);

export type State = {
	loggedUser: LoggedUser | undefined;
	userLanguage: string;
	dictionary: any; // ?? temporarily any
	themeWithLocale: Theme;
};

const initialState: State = {
	loggedUser: user,
	userLanguage,
	dictionary: dictionaryList[userLanguage as keyof typeof dictionaryList],
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
