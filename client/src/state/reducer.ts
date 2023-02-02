import { LoggedUser } from '../types';
import { State } from './state';
//prettier-ignore
export type Action =
	{
			type: 'SET_LOGGED_USER';
			payload: LoggedUser | undefined;
	}

export const setLoggedUser = (loggedUser: LoggedUser | undefined): Action => {
	return {
		type: 'SET_LOGGED_USER',
		payload: loggedUser
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
		default:
			return state;
	}
};
