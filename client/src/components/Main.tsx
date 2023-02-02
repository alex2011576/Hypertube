import { useStateValue } from '../state';
import Text from './Text';

const Main = () => {
	const [{ loggedUser }] = useStateValue();

	return (
		<>
			<Text tid="main" />
			<br />
			{loggedUser?.username} is logged in now! {/* temp row rm later */}
		</>
	);
};

export default Main;
