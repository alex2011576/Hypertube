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
					dispatch(setLoggedUser(loggedInUser));
					navigate('/');
					alert.success(`Logged in successfully. Welcome!`);
				} catch (err) {
					alert.error(
						err.response?.data?.error ||
							'Failed to authenticate. Please try again.'
					);
					navigate('/login');
				}
			}
		};
		authenticate42();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					dispatch(setLoggedUser(loggedInUser));
					navigate('/');
					alert.success(`Logged in successfully. Welcome!`);
				} catch (err) {
					alert.error(
						err.response?.data?.error ||
							'Failed to authenticate. Please try again.'
					);
					navigate('/login');
				}
			}
		};
		authenticateGH();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
