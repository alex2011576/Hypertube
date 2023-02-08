import { Action, setLoggedUser, setUserLanguage } from '../state';

export const logoutUser = (dispatch: React.Dispatch<Action>) => {
	window.localStorage.clear();
	dispatch(setUserLanguage('enUS'));
	dispatch(setLoggedUser(undefined));

};
