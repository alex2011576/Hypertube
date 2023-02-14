//prettier-ignore
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
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
			<Typography fontWeight={600}>{children}</Typography>
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
	title: JSX.Element | string;
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
								<DialogContent sx={{ padding: 0 }} dividers>
									{children}
								</DialogContent>
							</Dialog>
						</React.Fragment>,
						document.body
				  )
				: null}
		</>
	);
};
export default CustomModal;
