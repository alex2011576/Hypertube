//prettier-ignore
import { Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactDOM from 'react-dom';
import React from 'react';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';

interface DialogTitleProps {
	children?: React.ReactNode;
	onClose: () => void;
}

const CustomDialogTitle = (props: DialogTitleProps) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle
			color="#001489"
			sx={{
				m: 0,
				p: 2,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}
			{...other}
		>
			<SmartDisplayIcon fontSize="large" />
			{children}
			<IconButton aria-label="close" sx={{ color: '#001489' }} onClick={onClose}>
				<CloseIcon />
			</IconButton>
		</DialogTitle>
	);
};

const CustomModal = ({
	isOpen,
	handleToggle,
	title,
	children
}: {
	isOpen: boolean;
	handleToggle: () => void;
	title: string;
	children: any;
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			{isOpen
				? ReactDOM.createPortal(
						<React.Fragment>
							<Dialog open={isOpen} fullScreen={fullScreen}>
								<CustomDialogTitle onClose={handleToggle}>
									{title}
								</CustomDialogTitle>
								<DialogContent dividers>{children}</DialogContent>
							</Dialog>
						</React.Fragment>,
						document.body
				  )
				: null}
		</>
	);
};
export default CustomModal;
