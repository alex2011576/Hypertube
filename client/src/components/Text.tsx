import { useStateValue } from '../state';

const Text = ({ tid }: { tid: string }) => {
	const [{ dictionary }] = useStateValue();

	return dictionary[tid] || tid;
};

export default Text;
