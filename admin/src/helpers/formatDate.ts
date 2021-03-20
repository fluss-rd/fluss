export default function formatDate(date: Date) {
  const formatedDate = new Intl.DateTimeFormat("en");
  const formatFunction = (previous, current) =>
    Object({ ...previous, [current.type]: current.value });

  const parts = formatedDate.formatToParts().reduce(formatFunction, {});

  return `${parts.day}-${parts.month}-${parts.year}`;
}
