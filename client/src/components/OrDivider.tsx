import { Box, Typography } from "@mui/material";

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
			<Typography>OR</Typography>
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