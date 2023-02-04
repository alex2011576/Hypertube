import { setUserLanguage, useStateValue } from '../state';
import { useEffect, useState } from 'react';
import { languageOptions } from '../languages';
import FormControl from '@mui/material/FormControl';

const LangSelector = () => {
	const [{ userLanguage }, dispatch] = useStateValue();
	const [language, setLanguage] = useState(userLanguage || 'enUS');

	const handleChange = (event: any) => {
		setLanguage(event.target.value);
	};

	useEffect(() => {
		dispatch(setUserLanguage(language));
		window.localStorage.setItem('language', language);
	}, [language, dispatch]);

	return (
		<FormControl sx={{ m: 1, minWidth: 50 }} size="small">
			<select value={language} onChange={handleChange}>
				{Object.entries(languageOptions).map(([id, flag]) => (
					<option key={id} value={id}>
						{flag}
					</option>
				))}
			</select>
		</FormControl>
	);
};

export default LangSelector;
