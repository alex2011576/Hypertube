import { useStateValue } from '../state';

// Testing message translation
// Usage: const { translate } = useTranslate();
// const message = translate("tid");

export const useTranslate = () => {
	const [{ dictionary }] = useStateValue();
	const translate = (tid: string): string => dictionary[tid] || tid;
	return { translate };
};