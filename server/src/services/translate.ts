import axios from 'axios';
import { getErrorMessage } from '../errors';

export const googleTranslate = async (text: string, targetLanguage: string) => {
	try {
		const params = {
			q: text,
			source: 'en',
			target: targetLanguage,
			key: process.env.GOOGLE_API
		};

		const res = await axios.get('https://translation.googleapis.com/language/translate/v2', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			params: { ...params }
		});

		return res.data.data.translations[0].translatedText as string;
	} catch (err) {
		console.log(getErrorMessage(err));
		return undefined;
	}
};
