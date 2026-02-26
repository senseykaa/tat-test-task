// "2024-06-18" -> "18.06.2024"
export const formatDateToLocale = (date: string): string => {
  return new Date(date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
