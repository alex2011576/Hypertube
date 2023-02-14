import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Container, styled } from '@mui/material';

const FooterWrapper = styled(Container)`
	bottom: 0;
	padding: 1rem;
`;

const Footer = () => {
	return (
		<FooterWrapper>
			<Typography variant="body2" color="text.secondary" align="center">
				{'© '}
				<Link color="inherit" href="https://github.com/alex2011576/Hypertube">
					Hypertube
				</Link>
				{'  by Aleksei Shatalov, Ilona Shakurova & Cong Nguyen 2023'}
			</Typography>
		</FooterWrapper>
	);
};

export default Footer;
