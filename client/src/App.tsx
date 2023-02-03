import { Box, styled, ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useStateValue } from './state';

import ForgotPassword from './components/ForgotPassword';
import AlertSnackBar from './components/AlertSnackBar';
import AlertProvider from './components/AlertProvider';
import CustomModal from './components/CustomModal';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Login from './components/LoginCallbacks';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';
import useModal from './hooks/useModal';

const StyledBox = styled(Box)`
	text-align: center;
	flex-grow: 1;
	position: relative;
	top: 5rem;
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
	} = useModal(<LoginForm />, 'LOG IN');

	const {
		isOpen: isSignUpOpen,
		handleToggle: toggleSignUp,
		title: signUpTitle,
		children: signUpForm
	} = useModal(<SignUpForm />, 'SIGN UP');

	const {
		isOpen: isForgotPasswordOpen,
		handleToggle: toggleForgotPassword,
		title: forgotPasswordTitle,
		children: forgotPasswordForm
	} = useModal(<ForgotPassword />, 'RESET PASSWORD');

	return (
		<>
			<ThemeProvider theme={themeWithLocale}>
				<SnackbarProvider>
					<AlertProvider>
						<Navbar />
						<StyledBox>
							<AlertSnackBar />
							<Routes>
								<Route path="/" element={<Main />} />
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
									element={!loggedUser ? <Login.Callback42 /> : <Navigate to="/" />}
								/>
								<Route
									path="/auth/github/callback"
									element={!loggedUser ? <Login.CallbackGithub /> : <Navigate to="/" />}
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
								{/* <Route path="/profile" element={<ProfileEditor />} />
							<Route path="/profile/:id" element={<PublicProfilePage />} />
							<Route path="/update_email" element={<UpdateEmail />} /> */}
								<Route path="*" element={<Navigate to="/" replace />} />
							</Routes>
							<Footer />
						</StyledBox>
					</AlertProvider>
				</SnackbarProvider>
			</ThemeProvider>
		</>
	);
};

export default App;
