import { useCallback, useEffect, useState } from 'react';
import { translate } from '../services/translate';
import { useStateValue } from '../state';

export const useTranslateCallback = (text: string | undefined) => {
	const [{ loggedUser }] = useStateValue();

	const [data, setData] = useState<string>(text || '');

	const callback = useCallback(() => {
		const fetchData = async () => {
			try {
				if (
					loggedUser &&
					loggedUser.language &&
					text &&
					text.length &&
					loggedUser.language !== 'enUS'
				) {
					const targetLanguage = loggedUser.language.substring(0, 2);
					const res = await translate(text, targetLanguage);
					setData(res);
				}
			} catch (err) {
				console.log('error in useTranslateCallback:'); //rm later
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedUser]);

	useEffect(callback);

	return data;
};
