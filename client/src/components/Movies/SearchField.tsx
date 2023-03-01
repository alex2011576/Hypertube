//prettier-ignore
import { Box, styled, Paper, IconButton, InputBase, ToggleButton, Autocomplete, TextField } from '@mui/material';
//prettier-ignore
import { genresEn, genresRu, genresSv, sortCriteriaEn, sortCriteriaRu, sortCriteriaSv } from './autocompleteOptions';
import { useState } from 'react';
import { SearchQuery } from '../../types';
import { useStateValue } from '../../state';
import SearchIcon from '@mui/icons-material/Search';
import Text from '../Text';

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

const getTranslatedLabels = (userLanguage: string) => {
	if (userLanguage === 'svSE') {
		return {
			genreOptions: genresSv,
			sortOptions: sortCriteriaSv,
			genreLabel: 'Genre',
			sortLabel: 'Sortera Efter',
			searchLabel: 'Sök'
		};
	} else if (userLanguage === 'ruRU') {
		return {
			genreOptions: genresRu,
			sortOptions: sortCriteriaRu,
			genreLabel: 'Жанр',
			sortLabel: 'Сорт',
			searchLabel: 'Поиск'
		};
	} else {
		return {
			genreOptions: genresEn,
			sortOptions: sortCriteriaEn,
			genreLabel: 'Genre',
			sortLabel: 'Sort By',
			searchLabel: 'Search'
		};
	}
};

export default function SearchField({
	searchQuery,
	setSearchQuery
}: {
	searchQuery: SearchQuery;
	setSearchQuery: (searchQuery: SearchQuery) => void;
}) {
	const [{ loggedUser }] = useStateValue();
	const userLanguage = loggedUser?.language || 'enUS';
	const { genreOptions, sortOptions, genreLabel, sortLabel, searchLabel } =
		getTranslatedLabels(userLanguage);
	const [sortValue, setSortValue] = useState<string | undefined>();
	let queryTerm;
	const handleChange = (event: any) => {
		if (event.key === 'Enter') {
			// const queryTerm = event.target.value as string;
		 	queryTerm = event.target.value as string;
			queryTerm.length
				? setSearchQuery({ ...searchQuery, queryTerm, sortBy: sortValue || 'title' })
				: setSearchQuery({ ...searchQuery, queryTerm: '', sortBy: sortValue || 'download_count' });
		}
	};

	return (
		<SearchContainer>
			<InputField>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<InputBase onKeyDown={handleChange} placeholder={searchLabel} fullWidth />
			</InputField>
			<SelectorsWrapper>
				<InputField sx={{ mr: { md: '10px' } }}>
					<Autocomplete
						onChange={(_event, value) =>
							setSearchQuery({ ...searchQuery, genre: value?.value || '' })
						}
						options={genreOptions}
						getOptionLabel={(option) => option.key || ''}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								label={genreLabel}
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
							onChange={(_event, value) =>
								{
									setSortValue(value?.value);
									setSearchQuery({
										...searchQuery,
										sortBy: value?.value || (searchQuery.queryTerm.length ? 'title' : 'download_count')
									})
								}
								
							}
							options={sortOptions}
							getOptionLabel={(option) => option.key || ''}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									label={sortLabel}
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
						<Text tid="reverse" />
					</ReverseButton>
				</SortSelectorRow>
			</SelectorsWrapper>
		</SearchContainer>
	);
}
