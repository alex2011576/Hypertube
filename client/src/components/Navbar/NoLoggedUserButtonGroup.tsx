import { Button } from '@mui/material';
import useModal from '../../hooks/useModal';
import LangSelector from '../LangSelector';
import CustomModal from '../CustomModal';
import SignUpForm from '../SignUpForm';
import LoginForm from '../LoginForm';
import Text from '../Text';

const NoLoggedUserButtonGroup = () => {
	const {
		isOpen: isLoginOpen,
		handleToggle: toggleLogin,
		title: loginTitle,
		children: loginForm
	} = useModal(<LoginForm />, <Text tid="titleLogin" />);

	const {
		isOpen: isSignUpOpen,
		handleToggle: toggleSignUp,
		title: signUpTitle,
		children: signUpForm
	} = useModal(<SignUpForm />, <Text tid="titleSignup" />);

	return (
		<>
			<Button
				color="inherit"
				onClick={toggleLogin}
				sx={{
					fontSize: { xs: 12, sm: 14, md: '0.85rem', lg: '0.9rem' },
					minWidth: '50px',
					padding: '6px'
				}}
			>
				<Text tid="navbarLogin" />
			</Button>
			<CustomModal
				isOpen={isLoginOpen}
				handleToggle={toggleLogin}
				title={loginTitle}
				children={loginForm}
			/>
			<Button
				color="inherit"
				onClick={toggleSignUp}
				sx={{
					fontSize: { xs: 12, sm: 14, md: '0.85rem', lg: '0.9rem' },
					minWidth: '50px',
					padding: '6px'
				}}
			>
				<Text tid="navbarSignup" />
			</Button>
			<CustomModal
				isOpen={isSignUpOpen}
				handleToggle={toggleSignUp}
				title={signUpTitle}
				children={signUpForm}
			/>
			<LangSelector />
		</>
	);
};

export default NoLoggedUserButtonGroup;
