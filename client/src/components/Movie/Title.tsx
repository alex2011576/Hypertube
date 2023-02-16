import { Box, Typography, styled, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Wrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 1rem;
`;

const Row = styled(Box)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Title = ({
	titleEnglish,
	rating,
	downloadCount,
	likeCount,
	title
}: {
	titleEnglish: string;
	rating: number | undefined;
	downloadCount: number | undefined;
	likeCount: number | undefined;
	title: string;
}) => {
	return (
		<Wrapper>
			<Row>
				<Typography variant="h5" color={'white'} sx={{ fontWeight: 700 }}>
					{titleEnglish.toUpperCase()}
				</Typography>
				{rating && (
					<Box sx={{ display: 'flex', height: '100%' }}>
						<Typography variant="h6" color={'text.disabled'} ml={1}>
							⭑
						</Typography>
						<Typography variant="h6" color={'secondary'}>
							<strong>{rating}</strong>/10
						</Typography>
					</Box>
				)}
				<Box sx={{ display: 'flex', height: '100%', pt: '4px' }}>
					<Tooltip title={`${downloadCount} downloads; ${likeCount} like(s)`}>
						<InfoOutlinedIcon color={'primary'} sx={{ ml: 2 }} />
					</Tooltip>
				</Box>
			</Row>
			<Typography color={'white'} sx={{ fontWeight: 600 }}>
				{title === titleEnglish ? '' : title.toUpperCase()}
			</Typography>
		</Wrapper>
	);
};

export default Title;
