import { useState } from 'react';

const useModal = (children: JSX.Element, title: JSX.Element) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	function handleToggle() {
		setIsOpen(!isOpen);
	}

	return {
		isOpen,
		handleToggle,
		title,
		children
	};
};

export default useModal;
