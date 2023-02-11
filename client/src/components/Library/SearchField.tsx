//prettier-ignore
import { Box, SelectChangeEvent, Paper, IconButton, InputBase, FormControl, InputLabel, Select, MenuItem, ToggleButton } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

const wrapperStyle = {
	p: '0.5rem',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	width: '70%',
	minWidth: '300px'
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

const Selectors = styled(Box)`
	display: flex;
	flex-direction: row;
	width: 100%;
`;

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
				<InputBase
					sx={{ width: '100%' }}
					placeholder="Search"
					aria-label="Search movies"
					value={inputValue}
					onChange={handleChange}
				/>
			</Paper>
			<Selectors sx={flexRow}>
				<Box sx={flexRow}>
					<Paper sx={{ ...inputFieldStyle, mr: '1rem' }}>
						<FormControl variant="standard" sx={{ width: '100%' }}>
							<InputLabel>Genre</InputLabel>
							<Select
								sx={{
									pb: '14px',
									textAlign: 'left',
									minWidth: '130px',
									overflow: 'scroll'
								}}
								value={genre}
								disableUnderline
								onChange={handleGenreChange}
							>
								<MenuItem value="">
									<em>All</em>
								</MenuItem>
								{genres.map((genre) => (
									<MenuItem key={genre} value={genre.toLowerCase()}>
										{genre}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Paper>
				</Box>
				<Box sx={flexRow}>
					<Paper sx={{ ...inputFieldStyle, mr: '1rem' }}>
						<FormControl variant="standard" sx={{ width: '100%' }}>
							<InputLabel>Sort by</InputLabel>
							<Select
								sx={{
									pb: '14px',
									textAlign: 'left',
									minWidth: '130px',
									overflow: 'scroll'
								}}
								value={sortBy}
								disableUnderline
								onChange={handleSortCriteriaChange}
							>
								{sortCriteria.map((criteria) => (
									<MenuItem key={criteria} value={criteria.toLowerCase()}>
										{criteria}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Paper>
					<ToggleButton
						color="primary"
						sx={{ maxWidth: '5rem', height: '3rem', border: 'none' }}
						value="check"
						selected={reverseOrder}
						onChange={() => {
							setReverseOrder(!reverseOrder);
						}}
					>
						Reverse
					</ToggleButton>
				</Box>
			</Selectors>
		</Paper>
	);
}
