export type FormatType = "date" | "dateAndTime" | "time";

export type FormatDateConfig = {
  type?: FormatType;
  separator?: string;
  timeSeparator?: string;
  dateTimeSeparator?: string;
};

export default function formatDate(date: Date, config: FormatDateConfig = {}) {
  const type = config.type ? config.type : "date";
  const separator = config.separator ? config.separator : "/";
  const dateTimeSeparator = config.dateTimeSeparator ? config.dateTimeSeparator : " ";
  const timeSeparator = config.timeSeparator ? config.timeSeparator : ":";

  const { day, month, year, hours, minutes } = getDateParts(date);

  switch (type) {
    case "date":
      return day + separator + month + separator + year;
    case "time":
      return hours + separator + minutes;
    case "dateAndTime":
      return (
        day + separator + month + separator + year + dateTimeSeparator + hours + timeSeparator + minutes
      );
    default:
      return "";
  }
}

export function getDateParts(date: Date) {
  const formatedDate = new Intl.DateTimeFormat("en");
  const formatFunction = (previous, current) =>
    Object({ ...previous, [current.type]: current.value });

  const { day, month, year } = formatedDate.formatToParts().reduce(formatFunction, {});
  return { day, month, year, hours: date.getHours(), minutes: date.getMinutes() };
}

