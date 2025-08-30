import { differenceInDays, format, formatRelative } from "date-fns";

/**
 * There's generally no point in using this on the site as
 * the date is calculated at build time, would be fine to use
 * when the date is dynamically generated in a Astro-Island component.
 */
export function formatRelativeDateString(date: Date) {
  let formattedDate;
  if (differenceInDays(date, new Date()) > -7) {
    formattedDate = formatRelative(date, new Date());
  } else {
    formattedDate = format(date, "do MMMM, yyyy");
  }
  return formattedDate;
}

export function formatDateString(date: Date) {
  return format(date, "do MMMM, yyyy");
}
