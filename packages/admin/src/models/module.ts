import ModuleState from "./module-state";

type Module = {
  id: string;
  watershedId: string;
  state: ModuleState;
  phoneNumber: string;
  serial: string;
  creationDate: Date;
  updateDate: Date;
  location: Location;
};

export default Module;
