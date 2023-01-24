import { httpServer } from './app';

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
