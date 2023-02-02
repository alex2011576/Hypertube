import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Loader = () => {
	return (
		<div>
			<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
};

export default Loader;
