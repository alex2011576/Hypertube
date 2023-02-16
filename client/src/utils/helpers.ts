export const stringOrPlaceholder = (
	value: string | undefined,
	placeholder: string
): string => {
	return value?.length && value !== 'N/A' ? value : placeholder;
};

export const numberOrUndefined = (value: number): number | undefined => {
	return value && value > 0 ? value : undefined;
};
