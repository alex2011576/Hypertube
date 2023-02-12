//prettier-ignore
import { Box, styled, Paper, IconButton, InputBase, ToggleButton, Autocomplete, TextField } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { genres, sortCriteria } from './autocompleteOptions';
import SearchIcon from '@mui/icons-material/Search';
import { Query } from '../../types';

const SearchContainer = styled(Paper)`
	padding: 0.5rem;
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 65%;
	min-width: 300px;
`;

const autocompleteStyle = { minWidth: '130px', pb: '0.8rem' };

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
	query,
	setQuery,
	handleOnChange
}: {
	query: Query;
	setQuery: Dispatch<SetStateAction<Query>>;
	handleOnChange: () => void;
}) {
	const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
		const queryTerm = event.target.value as string;
		queryTerm.length
			? setQuery({ ...query, queryTerm, sortBy: 'Title' })
			: setQuery({ ...query, queryTerm: '', sortBy: 'Rating' });
		handleOnChange();
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
							value && setQuery({ ...query, genre: value })
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
							value={query.sortBy}
							onChange={(_event, value) =>
								value && setQuery({ ...query, sortBy: value })
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
						selected={query.reverseOrder}
						onChange={() => {
							setQuery({ ...query, reverseOrder: !query.reverseOrder });
						}}
					>
						Reverse
					</ReverseButton>
				</SortSelectorRow>
			</SelectorsWrapper>
		</SearchContainer>
	);
}
