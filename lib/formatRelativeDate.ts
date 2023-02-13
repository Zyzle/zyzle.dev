import { differenceInDays, format, formatRelative } from 'date-fns';

export function formatRelativeDateString(date: string) {
	const parsedDate = new Date(date);
	let formattedDate;
	if (differenceInDays(parsedDate, new Date()) > -7) {
		formattedDate = formatRelative(parsedDate, new Date());
	} else {
		formattedDate = format(parsedDate, 'do MMMM, yyyy');
	}
	return formattedDate;
}
