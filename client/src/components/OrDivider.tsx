import { Box, Typography } from "@mui/material";
import Text from './Text';

const OrDivider = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<Box
				sx={{
					height: '1px',
					width: '100%',
					border: '0.1px solid #80808036',
					mr: '7px'
				}}
			></Box>
			<Typography><Text tid="orDivider"/></Typography>
			<Box
				sx={{
					height: '1px',
					width: '100%',
					border: '0.1px solid #80808036',
					ml: '7px'
				}}
			></Box>
		</Box>
	);
};

export default OrDivider;