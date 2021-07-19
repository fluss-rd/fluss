import HourMeasure from "./HourMeasure";

export type Day = "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado" | "Domingo"

export type DayMeasures = {
  day: string;
  measures: Array<HourMeasure>;
};

export function getDayName(day: number): Day {
  switch (day) {
    case 0:
      return "Domingo";
    case 1:
      return "Lunes";
    case 2:
      return "Martes";
    case 3:
      return "Miércoles";
    case 4:
      return "Jueves";
    case 5:
      return "Viernes";
    case 6:
      return "Sábado";
  }
}

const getDayOfTheWeekByDayOfTheMonth = (dayOfTheMonth: number): number => {
  const month = new Date().getMonth()
  const year = new Date().getFullYear()

  return new Date(year, month, dayOfTheMonth).getDay()
}

export function getDayOfTheMonthName (dayOfTheMonth: string): Day {
  const day = getDayOfTheWeekByDayOfTheMonth(+dayOfTheMonth)
  return getDayName(day)
}

export default DayMeasures;

