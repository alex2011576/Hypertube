import { setUserLanguage, useStateValue } from '../state';
import { useEffect, useState } from 'react';
import { languageOptions } from '../languages';
import { styled } from '@mui/material';
import FormControl from '@mui/material/FormControl';

const StyledSelector = styled('select')`
	background-color: transparent;
	border: none;
	width: 2rem;
	padding-top: 3px;
`;

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
		<FormControl sx={{ m: 1, minWidth: 50, backgroundColor: 'transparent' }} size="small">
			<StyledSelector value={language} onChange={handleChange}>
				{Object.entries(languageOptions).map(([id, flag]) => (
					<option key={id} value={id}>
						{flag}
					</option>
				))}
			</StyledSelector>
		</FormControl>
	);
};

export default LangSelector;
