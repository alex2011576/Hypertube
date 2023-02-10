import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1700
		}
	},
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
					borderTop: 'none',
					borderRight: 'none',
					borderLeft: 'none',
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
					borderRadius: '2px!important'
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					border: '1px solid #b2b2b245',
					boxShadow: 'none'
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
		},
		MuiToggleButtonGroup: {
			styleOverrides: {
				root: {
					'& .MuiToggleButtonGroup-grouped': {
						margin: '0.5rem',
						border: 3,
						'&.Mui-disabled': {
							border: 3
						},
						'&:not(:first-of-type)': {
							borderRadius: 2
						},
						'&:first-of-type': {
							borderRadius: 2
						}
					}
				}
			}
		}
	}
});

export default theme;
