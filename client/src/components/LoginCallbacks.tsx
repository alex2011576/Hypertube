/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setLoggedUser, useStateValue } from '../state';
import { useContext, useEffect } from 'react';
import { AlertContext } from './AlertProvider';
import loginService from '../services/login';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Callback42 = () => {
	const [, dispatch] = useStateValue();
	const [searchParams] = useSearchParams();
	const code = searchParams.get('code');
	const state = searchParams.get('state');
	const alert = useContext(AlertContext);
	const navigate = useNavigate();

	useEffect(() => {
		const authenticate42 = async () => {
			if (code && state) {
				try {
					const loggedInUser = await loginService.auth42(code, state);
					const { passwordSet } = loggedInUser;
					delete loggedInUser.passwordSet;
					if (passwordSet === false) {
						dispatch(setLoggedUser(loggedInUser));
						navigate('/profile?setPassword=true');
						alert.success('alertLoginSuccessPasswordNotSet');
					} else {
						dispatch(setLoggedUser(loggedInUser));
						navigate('/');
						alert.success('alertLoginSuccess');
					}
				} catch (err) {
					alert.error(err.response?.data?.error || 'alertLoginError');
					navigate('/login');
				}
			} else {
				//alert.error('alertOAuthError');
				navigate('/login');
			}
		};
		authenticate42();
	}, []);

	return (
		<div>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
};

const CallbackGithub = () => {
	const [, dispatch] = useStateValue();
	const [searchParams] = useSearchParams();
	const code = searchParams.get('code');
	const state = searchParams.get('state');
	const alert = useContext(AlertContext);
	const navigate = useNavigate();

	useEffect(() => {
		const authenticateGH = async () => {
			if (code && state) {
				try {
					const loggedInUser = await loginService.authGitHub(code, state);
					const { passwordSet } = loggedInUser;
					delete loggedInUser.passwordSet;
					if (passwordSet === false) {
						dispatch(setLoggedUser(loggedInUser));
						navigate('/set_password');
						alert.success('alertLoginSuccessPasswordNotSet');
					} else {
						dispatch(setLoggedUser(loggedInUser));
						navigate('/');
						alert.success('alertLoginSuccess');
					}
				} catch (err) {
					alert.error(err.response?.data?.error || 'alertLoginError');
					navigate('/login');
				}
			} else {
				//alert.error('alertOAuthError');
				navigate('/login');
			}
		}; 
		authenticateGH();
	}, []);

	return (
		<div>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
};

const LoginCallbacks = { Callback42, CallbackGithub };
export default LoginCallbacks;
