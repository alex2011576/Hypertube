import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Router>
			<App />
		</Router>
	</ThemeProvider>
);
