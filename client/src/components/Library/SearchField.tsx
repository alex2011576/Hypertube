import SearchIcon from '@mui/icons-material/Search';
import { Paper, InputBase, IconButton } from '@mui/material/';
import { Dispatch, SetStateAction } from 'react';

const wrapperStyle = { p: '2px 4px', display: 'flex', alignItems: 'center', width: '40%' };

export default function SearchField({
	setQueryTerm: setInputValue,
	queryTerm: inputValue,
	handleOnChange
}: {
	setQueryTerm: Dispatch<SetStateAction<string>>;
	queryTerm: string;
	handleOnChange: () => void;
}) {
	const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
		setInputValue(event.target.value);
		handleOnChange();
	};

	return (
		<Paper component="form" sx={wrapperStyle}>
			<IconButton type="button" aria-label="search">
				<SearchIcon />
			</IconButton>
			<InputBase
				placeholder="Search"
				aria-label="Search movies"
				value={inputValue}
				onChange={handleChange}
			/>
		</Paper>
	);
}
