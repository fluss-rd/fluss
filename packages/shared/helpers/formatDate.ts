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
      return "09" + separator + month + separator + year;
    case "time":
      return hours + separator + minutes;
    case "dateAndTime":
      return (
        "09" +
        separator +
        month +
        separator +
        year +
        dateTimeSeparator +
        hours +
        timeSeparator +
        minutes
      );
    case "descriptive":
      // TODO: Make the timeDescription algorithm.
      return "Hace 30 minutos";
    default:
      return "";
  }
}

export function getDateParts(date: Date) {
  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  let month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(date);
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  return { day, month, year, hours: date.getHours(), minutes: date.getMinutes() };
}

