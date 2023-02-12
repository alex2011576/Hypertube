//prettier-ignore
import { Box, SelectChangeEvent, Paper, IconButton, InputBase, FormControl, InputLabel, Select, MenuItem, ToggleButton } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const wrapperStyle = {
	p: '0.5rem',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	width: '65%',
	minWidth: '300px',
	// border: 'none'
};

const inputFieldStyle = {
	height: '3rem',
	p: '0.7rem',
	m: '0.5rem 0',
	display: 'flex',
	alignItems: 'center',
	width: '100%'
};

const flexRow = { display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' };

// const Selectors = styled(Box)`
// 	display: flex;
// 	width: 100%;
// `;

export default function SearchField({
	setQueryTerm: setInputValue,
	queryTerm: inputValue,
	handleOnChange
}: {
	setQueryTerm: Dispatch<SetStateAction<string>>;
	queryTerm: string;
	handleOnChange: () => void;
}) {
	const [sortBy, setSortBy] = useState('');
	const [genre, setGenre] = useState('');
	const [reverseOrder, setReverseOrder] = useState<boolean>(false);
	const sortCriteria = ['Title', 'Rating', 'Year', 'Downloads'];
	const genres = [
		'Action',
		'Adventure',
		'Animation',
		'Biography',
		'Comedy',
		'Crime',
		'Documentary',
		'Drama',
		'Family',
		'Fantasy',
		'Film-Noir',
		'Game-Show',
		'History',
		'Horror',
		'Music',
		'Musical',
		'Mystery',
		'News',
		'Reality-TV',
		'Romance',
		'Sci-Fi',
		'Sport',
		'Talk-Show',
		'Thriller',
		'War',
		'Western'
	];
	const handleSortCriteriaChange = (event: { target: { value: string } }) => {
		setSortBy(event.target.value as string);
	};

	const handleGenreChange = (event: SelectChangeEvent) => {
		setGenre(event.target.value as string);
	};

	const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
		setInputValue(event.target.value);
		handleOnChange();
	};

	return (
		<Paper sx={wrapperStyle}>
			<Paper sx={inputFieldStyle}>
				<IconButton type="button" aria-label="search">
					<SearchIcon />
				</IconButton>
			<SelectorsWrapper>
				<InputField sx={{ mr: { md: '10px' } }}>
					<Autocomplete
						onChange={(_event, value) => value && setGenre(value)}
						options={genres}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								label="Genre"
								variant="standard"
								sx={autocompleteStyle}
								InputProps={{
									...params.InputProps,
									disableUnderline: true
								}}
							/>
						)}
					/>
				</InputField>
				<SortSelectorRow>
					<InputField>
						<Autocomplete
							value={sortBy}
							onChange={(_event, value) => value && setSortBy(value)}
							options={sortCriteria}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									label="Sort by"
									variant="standard"
									sx={autocompleteStyle}
									InputProps={{
										...params.InputProps,
										disableUnderline: true
									}}
								/>
							)}
						/>
					</InputField>
					<ReverseButton
						color="primary"
						value="check"
						selected={reverseOrder}
						onChange={() => {
							setReverseOrder(!reverseOrder);
						}}
					>
						Reverse
					</ReverseButton>
				</SortSelectorRow>
			</Box>
		</Paper>
	);
}
