import { Box, Typography, styled } from '@mui/material';

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
					Directed by: <strong>{director}</strong> {/*TID!*/}
				</Typography>
			)}
			{writer.length > 3 && (
				<Typography color={'text.disabled'}>
					Written by: <strong>{writer}</strong> {/*TID!*/}
				</Typography>
			)}
			{actors.length > 3 && (
				<Box>
					<Typography color={'text.disabled'}>
						Cast: <strong>{actors}</strong>
						{/*TID!*/}
					</Typography>
				</Box>
			)}
		</Wrapper>
	);
};

export default Creators;
