import { ModuleData } from "services/modules/models";

export type Location = {
  latitude: number;
  longitude: number;
};

export default class Module {
  id: string;
  simNumber: string;
  serial: string;
  description: string;
  location: Location;
  updatedAt: Date;
  createdAt: Date;
  riverName: string;
  state: string;

  constructor(module: Partial<Module>) {
    this.id = module.id;
    this.simNumber = module.simNumber;
    this.serial = module.serial;
    this.description = module.description;
    this.location = module.location;
    this.updatedAt = module.updatedAt;
    this.createdAt = module.createdAt;
    this.riverName = module.riverName;
    this.state = module.state;
  }

  static mockData(): Module[] {
    const modules: Module[] = [];

    for (let i = 1; i <= 8; i++) {
      modules.push(
        new Module({
          id: `MD-0${i}`,
          simNumber: `(809) ${i}34-3491`,
          serial: `000${i}`,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          description: "Permite obtener la información de los sensores y enviarlas",
          location: { latitude: 18.4667, longitude: -69.9 },
          riverName: "Yaque del Norte",
          state: "inactive",
        })
      );
    }

    return modules;
  }

  static fromModuleData(moduleData?: ModuleData): Module | null {
    if (!moduleData) return null;

    return {
      id: moduleData.moduleId,
      location: { ...moduleData.location },
      riverName: moduleData.riverName,
      updatedAt: new Date(moduleData.updateDate),
      createdAt: new Date(moduleData.creationDate),
      description: "Ubicado en el río Yaque del Norte",
      serial: moduleData.serial,
      simNumber: moduleData.phoneNumber,
      state: moduleData.state,
    };
  }

  static fromModuleDataList(moduleDataList?: ModuleData[]): Module[] | undefined {
    if (!moduleDataList) return undefined;

    const elements = moduleDataList.map((m) => Module.fromModuleData(m));
    return elements;
  }
}
