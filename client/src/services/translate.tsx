import axios from 'axios';

export const translate = async (text: string, targetLanguage: string): Promise<string> => {
	try {
		const params = new URLSearchParams();
		params.append('q', text);
		params.append('source', 'en');
		params.append('target', targetLanguage);
		params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

		const res = await axios.post('https://libretranslate.de/translate', params, {
			headers: {
				accept: 'application/json',
				'content-type': 'application/x-www-form-urlencoded'
			}
		});

		return res.data.translatedText;
	} catch (err) {
		return text;
	}
};