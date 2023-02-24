import { Box, styled, ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useStateValue } from './state';

import ProfileSettings from './components/ProfileSettings';
import PublicProfile from './components/PublicProfile';
import SetPasswordForm from './components/SetPasswordForm';
import ForgotPassword from './components/ForgotPassword';
import AlertSnackBar from './components/AlertSnackBar';
import AlertProvider from './components/AlertProvider';
import CustomModal from './components/CustomModal';
import UpdateEmail from './components/UpdateEmail';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Login from './components/LoginCallbacks';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import useModal from './hooks/useModal';
import Movies from './components/Movies';
import Movie from './components/Movie';
import Text from './components/Text';

const StyledBox = styled(Box)`
	text-align: center;
	flex-grow: 1;
	position: relative;
	top: 64px;
	max-width: 100%;
	min-width: 320px;
`;

const App = () => {
	const [{ loggedUser, themeWithLocale }] = useStateValue();

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

	const {
		isOpen: isForgotPasswordOpen,
		handleToggle: toggleForgotPassword,
		title: forgotPasswordTitle,
		children: forgotPasswordForm
	} = useModal(<ForgotPassword />, <Text tid="titleResetPassword" />);

	const {
		isOpen: isSetPasswordOpen,
		handleToggle: toggleSetPassword,
		title: setPasswordTitle,
		children: setPasswordForm
	} = useModal(<SetPasswordForm />, <Text tid="setPasswordTitle" />);

	return (
		<ThemeProvider theme={themeWithLocale}>
			<SnackbarProvider>
				<AlertProvider>
					<Navbar />
					<StyledBox>
						<AlertSnackBar />
						<Routes>
							<Route path="/" element={loggedUser ? <Movies /> : <Landing />} />
							<Route
								path="/login"
								element={
									!loggedUser ? (
										<CustomModal
											isOpen={!isLoginOpen}
											handleToggle={toggleLogin}
											title={loginTitle}
											children={loginForm}
										/>
									) : (
										<Navigate to="/" />
									)
								}
							/>
							<Route
								path="/auth/42/callback"
								element={
									!loggedUser ? (
										<Login.Callback42 />
									) : (
										<Navigate to="/" /> 
									)
								}
							/>
							<Route
								path="/auth/github/callback"
								element={
									!loggedUser ? (
										<Login.CallbackGithub />
									) : (
										<Navigate to="/" />
									)
								}
							/>
							<Route
								path="/signup"
								element={
									!loggedUser ? (
										<CustomModal
											isOpen={!isSignUpOpen}
											handleToggle={toggleSignUp}
											title={signUpTitle}
											children={signUpForm}
										/>
									) : (
										<Navigate to="/" />
									)
								}
							/>
							<Route
								path="/set_password"
								element={
									loggedUser ? (
										<CustomModal
											isOpen={!isSetPasswordOpen}
											handleToggle={toggleSetPassword}
											title={setPasswordTitle}
											children={setPasswordForm}
										/>
									) : (
										<Navigate to="/login" />
									)
								}
							/>
							<Route
								path="/forgot_password"
								element={
									!loggedUser ? (
										<CustomModal
											isOpen={!isForgotPasswordOpen}
											handleToggle={toggleForgotPassword}
											title={forgotPasswordTitle}
											children={forgotPasswordForm}
										/>
									) : (
										<Navigate to="/" />
									)
								}
							/>
							<Route path="/profile" element={<ProfileSettings />} />
							<Route path="/profile/:id" element={<PublicProfile />} />
							<Route path="/update_email" element={<UpdateEmail />} />
							<Route path="/movies/" element={<Movies />} />
							<Route path="/movies/:id" element={<Movie />} />
							{/* <Route path="/auth/:id/callback" element={< />} /> */}
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
						<Footer />
					</StyledBox>
				</AlertProvider>
			</SnackbarProvider>
		</ThemeProvider>
	);
};

export default App;
