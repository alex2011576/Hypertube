import { useStateValue } from '../state';

// Testing Error message translation
// Usage: const { errorTranslate } = useErrorTranslate();
// const errorMessage = errorTranslate("tid");

export const useErrorTranslate = () => {
	const [{ dictionary }] = useStateValue();
	const errorTranslate = (tid: string): string => dictionary[tid] || tid;
	return { errorTranslate };
};