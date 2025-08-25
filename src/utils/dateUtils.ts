import { differenceInDays, format, formatRelative } from "date-fns";

export function formatRelativeDateString(date: Date) {
  let formattedDate;
  if (differenceInDays(date, new Date()) > -7) {
    formattedDate = formatRelative(date, new Date());
  } else {
    formattedDate = format(date, "do MMMM, yyyy");
  }
  return formattedDate;
}
