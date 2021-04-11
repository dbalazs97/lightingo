export const mapToInterval = (
	value: number,
	srcStart: number,
	srcEnd: number,
	destStart: number,
	destEnd: number,
): number => {
	return ((value - srcStart) / (srcEnd - srcStart)) * (destEnd - destStart) + destStart;
};
