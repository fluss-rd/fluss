export default class Module {
  id: string;
  simNumber: string;
  name: string;
  description: string;
  location: string;
  updatedAt: Date;
  createdAt: Date;
  hmm: number;

  constructor(module: Partial<Module>) {
    this.id = module.id;
    this.simNumber = module.simNumber;
    this.name = module.name;
    this.description = module.description;
    this.location = module.location;
    this.updatedAt = module.updatedAt;
    this.createdAt = module.createdAt;
    this.hmm = module.hmm;
  }

  static mockData(): Module[] {
    const modules: Module[] = [];

    for (let i = 1; i <= 8; i++) {
      modules.push(
        new Module({
          id: `MD-0i`,
          simNumber: `(809) ${i}34-3491`,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          description: "Permite obtener la información de los sensores y enviarlas",
          location: "34:349,24029:002",
          name: `Módulo ${i}`,
          hmm: i,
        })
      );
    }

    return modules;
  }
}
