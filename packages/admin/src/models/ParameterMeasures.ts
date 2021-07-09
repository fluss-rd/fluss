import DayMeasures from "shared/models/DayMeasures";

type ParameterMeasures = {
  parameterName: string;
  max: number;
  min: number;
  color: string;
  measures: DayMeasures[];
};

export function mockParameterMeasures(): ParameterMeasures[] {
  return [
    {
      parameterName: "ph",
      max: 12,
      min: 2,
      color: "green",
      measures: [
        {
          day: "Lunes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
        {
          day: "Martes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
      ],
    },
    {
      parameterName: "O",
      color: "dodgerblue",
      max: 12,
      min: 2,
      measures: [
        {
          day: "Lunes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
        {
          day: "Martes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
      ],
    },
    {
      parameterName: "Temp",
      color: "goldenrod",
      max: 12,
      min: 2,
      measures: [
        {
          day: "Lunes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
        {
          day: "Martes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
      ],
    },
    {
      parameterName: "Sol",
      color: "indianred",
      max: 12,
      min: 2,
      measures: [
        {
          day: "Lunes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
        {
          day: "Martes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
      ],
    },
    {
      parameterName: "Tur",
      color: "mediumpurple",
      max: 12,
      min: 2,
      measures: [
        {
          day: "Lunes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
        {
          day: "Martes",
          measures: [
            { hour: 8, value: 2 },
            { hour: 11, value: 10 },
            { hour: 14, value: 4 },
            { hour: 17, value: 12 },
            { hour: 20, value: 8 },
            { hour: 23, value: 3 },
          ],
        },
      ],
    },
  ];
}

export default ParameterMeasures;
