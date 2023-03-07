import styled, { keyframes } from 'styled-components';

const fadeInAnimation = keyframes`
	from {
		opacity: 0;
		transform: translateX(-100%);
	}
	to {
		opacity: 1;
		transform: translateX(0%);
	}
`;

const Fade = styled.div`
	animation: ${fadeInAnimation} 1600ms ease 1;
	color: white;
`;

type Fading = {
	children: React.ReactNode;
};

const FadingInFromTopComponent: React.FC<Fading> = ({ children }) => {
	return <Fade>{children}</Fade>;
};
export default FadingInFromTopComponent;
