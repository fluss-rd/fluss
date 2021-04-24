import { ModuleData, ModuleForm } from "services/modules/models";

import River from "./River";

export type Location = {
  latitude: number;
  longitude: number;
};

export default class Module {
  id: string;
  simNumber: string;
  serial: string;
  location: Location;
  updatedAt: Date;
  createdAt: Date;
  riverName: string;
  riverId: string;
  state: string;

  constructor(module: Partial<Module>) {
    this.id = module.id;
    this.simNumber = module.simNumber;
    this.serial = module.serial;
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
          location: { latitude: 18.4667, longitude: -69.9 },
          riverName: "Yaque del Norte",
          state: "inactive",
        })
      );
    }

    return modules;
  }

  static fromModuleData(moduleData: ModuleData): Module {
    return {
      id: moduleData.moduleId,
      location: { ...moduleData.location },
      riverName: moduleData.riverName,
      updatedAt: new Date(moduleData.updateDate),
      createdAt: new Date(moduleData.creationDate),
      serial: moduleData.serial,
      simNumber: moduleData.phoneNumber,
      riverId: moduleData.riverId,
      state: moduleData.state,
    };
  }

  static fromModuleDataList(moduleDataList?: ModuleData[]): Module[] {
    const elements = moduleDataList.map((m) => Module.fromModuleData(m));
    return elements;
  }

  static toModuleForm(module: Module): ModuleForm {
    return {
      phoneNumber: module.simNumber,
      serial: module.serial,
      location: module.location,
      riverId: module.riverId,
    };
  }
}
