import { State, themeWithLocale } from './state';
import { dictionaryList } from '../languages';
import { LoggedUser, LanguageOption } from '../types';

export type Action =
	| {
			type: 'SET_LOGGED_USER';
			payload: LoggedUser | undefined;
	  }
	| {
			type: 'SET_USER_LANGUAGE';
			payload: LanguageOption;
	  };

export const setLoggedUser = (loggedUser: LoggedUser | undefined): Action => {
	return {
		type: 'SET_LOGGED_USER',
		payload: loggedUser
	};
};

export const setUserLanguage = (userLanguage: LanguageOption): Action => {
	return {
		type: 'SET_USER_LANGUAGE',
		payload: userLanguage
	};
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_LOGGED_USER':
			if (action.payload)
				return {
					...state,
					loggedUser: action.payload
				};
			else {
				return { ...state, loggedUser: undefined };
			}
		case 'SET_USER_LANGUAGE':
			return {
				...state,
				userLanguage: action.payload,
				dictionary: dictionaryList[action.payload as keyof typeof dictionaryList],
				themeWithLocale: themeWithLocale(action.payload)
			};
		default:
			return state;
	}
};
