/* eslint-disable @typescript-eslint/no-unused-vars */
//prettier-ignore
import { Box, Button, TextField, Checkbox, Grid, FormControlLabel, Container, Link, Typography } from '@mui/material';
//prettier-ignore
import { validatePassword, validateUsername, validateLoginForm } from '../utils/inputValidators';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setLoggedUser, StateContext } from '../state';
import { AlertContext } from './AlertProvider';
import { useField } from '../hooks/useField';
import { apiBaseUrl } from '../constants';
//import userService from '../services/users';
import loginService from '../services/login';
import OrDivider from './OrDivider';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Text from './Text';

export const Auth42 = () => {
	const alert = useContext(AlertContext);

	const handle42login = async (event: any) => {
		event.preventDefault();
		try {
			window.location.href = `${apiBaseUrl}/login/42`;
		} catch (err) {
			alert.error('alertErrorOccured');
		}
	};

	return (
		<Button variant="outlined" onClick={handle42login} sx={{ mb: 2 }}>
			<Text tid='logInWith42' />
		</Button>
	);
};

export const AuthGH = () => {
	const alert = useContext(AlertContext);

	const handle42login = async (event: any) => {
		event.preventDefault();
		try {
			window.location.href = `${apiBaseUrl}/login/github`;
		} catch (err) {
			alert.error('alertErrorOccured');
		}
	};

	return (
		<Button variant="outlined" onClick={handle42login} sx={{ mb: 2 }}>
			<Text tid='logInWithGithub' />
		</Button>
	);
};
