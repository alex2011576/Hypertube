import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
	return (
		<Typography
			sx={{ mt: 8, mb: 4 }}
			variant="body2"
			color="text.secondary"
			align="center"
		>
			{'© '}
			<Link color="inherit" href="https://github.com/alex2011576/Hypertube">
				Hypertube
			</Link>
			{'  by Aleksei Shatalov, Ilona Shakurova & Cong Nguyen 2023'}
		</Typography>
	);
};

export default Footer;
