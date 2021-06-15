import DayMeasures from "./day-measures";

type ParameterMeasures = {
  parameterName: string;
  measures: DayMeasures[];
};

export function mockParameterMeasures(): ParameterMeasures[] {
  return [
    {
      parameterName: "ph",
      measures: [
        {
          day: "Lunes",
          measures: [
            { hour: 8, level: 2 },
            { hour: 11, level: 10 },
            { hour: 14, level: 4 },
            { hour: 17, level: 12 },
            { hour: 20, level: 8 },
            { hour: 23, level: 3 },
          ],
        },
        {
          day: "Martes",
          measures: [
            { hour: 8, level: 2 },
            { hour: 11, level: 10 },
            { hour: 14, level: 4 },
            { hour: 17, level: 12 },
            { hour: 20, level: 8 },
            { hour: 23, level: 3 },
          ],
        },
      ],
    },
  ];
}

export default ParameterMeasures;
