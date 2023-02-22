import { Box, Typography, styled } from '@mui/material';
import Text from '../../Text';

const Wrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin: 1rem 0;
`;

const Creators = ({
	director,
	writer,
	actors
}: {
	director: string;
	writer: string;
	actors: string;
}) => {
	return (
		<Wrapper>
			{director.length > 3 && (
				<Typography color={'text.disabled'}>
					<Text tid="director" />: <strong>{director}</strong>
				</Typography>
			)}
			{writer.length > 3 && (
				<Typography color={'text.disabled'}>
					<Text tid="writer" />: <strong>{writer}</strong>
				</Typography>
			)}
			{actors.length > 3 && (
				<Box>
					<Typography color={'text.disabled'}>
						<Text tid="actors" />: <strong>{actors}</strong>
					</Typography>
				</Box>
			)}
		</Wrapper>
	);
};

export default Creators;
