import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		fontFamily: 'DM Sans, sans-serif',
		fontWeightLight: 300,
		fontSize: 14
	},
	palette: {
		primary: {
			main: '#001489',
			contrastText: '#ffffff'
		},
		secondary: {
			main: '#ffffff',
			contrastText: '#001489'
		},
		text: {
			primary: '#414141',
			secondary: '#9e9e9e',
			disabled: '#bdbdbd'
		}
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					position: 'fixed',
					display: 'flex',
					justifyContent: 'space-between',
					borderBottom: '1px solid #b2b2b245',
					borderRadius: 0,
					maxWidth: '100%',
					boxShadow: 'none'
				}
			}
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true
			},
			styleOverrides: {
				root: {
					borderRadius: '2px!important',
				}
			}
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					margin: 0,
					paddingBottom: '10px',
					'&.error': {
						margin: 0,
						paddingBottom: '10px'
					}
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				root: {
					width: '600px',
					margin: '0 auto',
					'@media (max-width: 600px)': {
						minWidth: '320px',
						maxWidth: '100vw'
					}
				},
				paper: {
					width: '100%'
				}
			}
		}
	}
});

export default theme;
