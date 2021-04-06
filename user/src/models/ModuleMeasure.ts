export default class ModuleMeasure {
  id: string;
  moment: string;
  dateTime: Date;
  oxygen: number;
  pH: number;
  temperature: number;
  turbidity: number;
  dissolvedSolids: number;

  constructor(measure: ModuleMeasure) {
    Object.assign(this, measure);
  }

  static mockData(): ModuleMeasure[] {
    const measures: Array<ModuleMeasure> = [
      {
        id: "MM-1",
        moment: "Lunes",
        dateTime: new Date(Date.now()),
        oxygen: 20,
        pH: 30,
        temperature: 10,
        turbidity: 30,
        dissolvedSolids: 10,
      },
      {
        id: "MM-2",
        moment: "Martes",
        dateTime: new Date(Date.now()),
        oxygen: 10,
        pH: 20,
        temperature: 10,
        turbidity: 30,
        dissolvedSolids: 10,
      },
      {
        id: "MM-3",
        moment: "Lunes",
        dateTime: new Date(Date.now()),
        oxygen: 20,
        pH: 30,
        temperature: 10,
        turbidity: 30,
        dissolvedSolids: 10,
      },
      {
        id: "MM-4",
        moment: "Martes",
        dateTime: new Date(Date.now()),
        oxygen: 10,
        pH: 20,
        temperature: 10,
        turbidity: 30,
        dissolvedSolids: 10,
      },
    ];

    return measures;
  }
}
