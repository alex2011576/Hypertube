import { BrowserRouter as Router } from 'react-router-dom';
import { reducer, StateProvider } from './state';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
	<Router>
		<CssBaseline />
		<StateProvider reducer={reducer}>
			<App />
		</StateProvider>
	</Router>
);
