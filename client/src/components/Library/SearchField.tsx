import SearchIcon from '@mui/icons-material/Search';
import { Paper, InputBase, IconButton } from '@mui/material/';

const wrapperStyle = { p: '2px 4px', display: 'flex', alignItems: 'center', width: '40%' };

export default function SearchField() {
	return (
		<Paper component="form" sx={wrapperStyle}>
			<IconButton type="button" aria-label="search">
				<SearchIcon />
			</IconButton>
			<InputBase
				placeholder="Search"
				sx={{ width: '100%' }}
				inputProps={{ 'aria-label': 'search movies' }}
			/>
		</Paper>
	);
}
