import AlertProvider from './components/AlertProvider';
import AlertSnackBar from './components/AlertSnackBar';
import Navbar from './components/Navbar';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';

import { SnackbarProvider } from 'notistack';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { useStateValue } from './state';
import Main from './components/Main';

const StyledBox = styled(Box)`
	text-align: center;
	flex-grow: 1;
	position: relative;
	top: 5rem;
	max-width: 100%;
	min-width: 320px;
`;

const App = () => {
	const [{ loggedUser }] = useStateValue();

	return (
		<>
			<SnackbarProvider>
				<AlertProvider>
					<Navbar />
					<StyledBox>
						<AlertSnackBar />
						<Routes>
							<Route path="/" element={<Main />} />
							<Route
								path="/login"
								element={!loggedUser ? <LoginForm /> : <Navigate to="/" />}
							/>
							<Route
								path="/signup"
								element={!loggedUser ? <SignUpForm /> : <Navigate to="/" />}
							/>
							{/* <Route
								path="/forgot_password"
								element={
									!loggedUser ? <ForgotPassword /> : <Navigate to="/" />
								}
							/> */}
							{/* <Route path="/profile" element={<ProfileEditor />} />
							<Route path="/profile/:id" element={<PublicProfilePage />} />
							<Route path="/update_email" element={<UpdateEmail />} /> */}
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
						<Footer />
					</StyledBox>
				</AlertProvider>
			</SnackbarProvider>
		</>
	);
};

export default App;
