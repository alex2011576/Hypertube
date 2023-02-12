//prettier-ignore
import { Box, styled, Paper, IconButton, InputBase, ToggleButton, Autocomplete, TextField } from '@mui/material';
import { genres, sortCriteria } from './autocompleteOptions';
import { Dispatch, SetStateAction } from 'react';
import { SearchQuery } from '../../types';
import SearchIcon from '@mui/icons-material/Search';

const autocompleteStyle = { minWidth: '130px', pb: '0.8rem' };

const SearchContainer = styled(Paper)`
	padding: 0.5rem;
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 65%;
	min-width: 300px;
`;

const InputField = styled(Paper)`
	height: 3rem;
	padding: 0.7rem;
	margin: 0.3rem 0;
	display: flex;
	align-items: center;
	width: 100%;
`;

const SortSelectorRow = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
`;

const ReverseButton = styled(ToggleButton)`
	max-width: 5rem;
	height: 2.9rem;
	border: none;
	margin-left: 10px;
`;

const SelectorsWrapper = styled(Box)`
	width: 100%;
	display: flex;
	${(props) => props.theme.breakpoints.down('md')} {
		flex-direction: column;
	}
`;

export default function SearchField({
	searchQuery,
	setSearchQuery
}: {
	searchQuery: SearchQuery;
	setSearchQuery: (searchQuery: SearchQuery) => void;
}) {

	const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
		const queryTerm = event.target.value as string;
		queryTerm.length
			? setSearchQuery({ ...searchQuery, queryTerm, sortBy: 'Title' })
			: setSearchQuery({ ...searchQuery, queryTerm: '', sortBy: 'Rating' });
	};

	return (
		<SearchContainer>
			<InputField>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<InputBase onChange={handleChange} placeholder="Search" fullWidth />
			</InputField>
			<SelectorsWrapper>
				<InputField sx={{ mr: { md: '10px' } }}>
					<Autocomplete
						onChange={(_event, value) =>
							setSearchQuery({ ...searchQuery, genre: value || '' })
						}
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
							value={searchQuery.sortBy}
							onChange={(_event, value) =>
								setSearchQuery({ ...searchQuery, sortBy: value || 'Title' })
							}
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
						selected={searchQuery.reverseOrder}
						onChange={() => {
							setSearchQuery({
								...searchQuery,
								reverseOrder: !searchQuery.reverseOrder
							});
						}}
					>
						Reverse
					</ReverseButton>
				</SortSelectorRow>
			</SelectorsWrapper>
		</SearchContainer>
	);
}
