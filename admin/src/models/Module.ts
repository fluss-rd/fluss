import { ModuleData } from "services/modules/models";

export default class Module {
  id: string;
  simNumber: string;
  serial: string;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  updatedAt: Date;
  createdAt: Date;
  river: string;
  hmm: number;

  constructor(module: Partial<Module>) {
    this.id = module.id;
    this.simNumber = module.simNumber;
    this.serial = module.serial;
    this.name = module.name;
    this.description = module.description;
    this.location = module.location;
    this.latitude = module.latitude;
    this.longitude = module.longitude;
    this.updatedAt = module.updatedAt;
    this.createdAt = module.createdAt;
    this.river = module.river;
    this.hmm = module.hmm;
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
          location: "18.4667,-69.9000",
          latitude: 18.4667,
          longitude: -69.9,
          name: `Módulo ${i}`,
          river: "Yaque del Norte",
          hmm: i,
        })
      );
    }

    return modules;
  }

  static fromModuleData(moduleData?: ModuleData): Module {
    if (!moduleData)
      return {
        river: "",
        name: "",
        id: "",
        longitude: 0,
        latitude: 0,
        location: "",
        updatedAt: new Date(Date.now()),
        createdAt: new Date(Date.now()),
        description: "",
        serial: "",
        simNumber: "",
        hmm: 1,
      };

    return {
      river: "Yaque del Norte",
      name: "",
      id: moduleData.moduleId,
      longitude: -69.9,
      latitude: 18.4667,
      location: "18.4667,-69.9000",
      updatedAt: new Date(moduleData.updateDate),
      createdAt: new Date(moduleData.creationDate),
      description: "Ubicado en el río Yaque del Norte",
      serial: moduleData.serial,
      simNumber: moduleData.phoneNumber,
      hmm: 1,
    };
  }

  static fromModuleDataList(moduleDataList?: ModuleData[]): Module[] {
    if (!moduleDataList) return [];

    const elements = moduleDataList.map((m) => Module.fromModuleData(m));
    return elements;
  }
}

