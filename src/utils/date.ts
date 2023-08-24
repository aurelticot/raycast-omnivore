import { formatRelative, parseISO } from "date-fns";

export function formatRelativeDateFromNow(date: Date | string) {
  const d = date instanceof Date ? date : parseISO(date);
  return formatRelative(d, new Date(), { weekStartsOn: 1 });
}
