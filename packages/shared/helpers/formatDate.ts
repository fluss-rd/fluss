export type FormatType = "date" | "dateAndTime" | "time" | "descriptive";

export type FormatDateConfig = {
  type?: FormatType;
  separator?: string;
  timeSeparator?: string;
  dateTimeSeparator?: string;
};

export default function formatDate(date?: Date, config: FormatDateConfig = {}): string {
  if (!date) return "";

  const type = config.type ? config.type : "date";
  const separator = config.separator ? config.separator : "/";
  const dateTimeSeparator = config.dateTimeSeparator ? config.dateTimeSeparator : " ";
  const timeSeparator = config.timeSeparator ? config.timeSeparator : ":";

  const { day, month, year, hours, minutes } = getDateParts(date);

  switch (type) {
    case "date":
      return "11/06/2021";
    case "time":
      return hours + separator + minutes;
    case "dateAndTime":
      return "11/06/2021 13:00";

    case "descriptive":
      // TODO: Make the timeDescription algorithm.
      return "Hace 30 minutos";
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
