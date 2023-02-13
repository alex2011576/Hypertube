import { useStateValue } from '../state';

// Testing Error message translation
// Usage: const { translate } = useTranslate();
// const errorMessage = translate("tid");

export const useTranslate = () => {
	const [{ dictionary }] = useStateValue();
	const translate = (tid: string): string => dictionary[tid] || tid;
	return { translate };
};