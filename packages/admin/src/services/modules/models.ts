import Module from "shared/models/Module";

export type ModuleData = {
  moduleId: string;
  phoneNumber: string;
  riverId: string;
  riverName: string;
  userId: string;
  creationDate: string;
  updateDate: string;
  state: string;
  serial: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type ModuleForm = {
  alias: string;
  phoneNumber: string;
  serial: string;
  watershedId: string;
  status: string;
  location: { latitude: number; longitude: number };
};

export function toModuleForm(module: Module): ModuleForm {
  return {
    alias: module?.alias || "",
    serial: module?.serial || "",
    phoneNumber: module?.phoneNumber || "",
    status: module?.state || "",
    watershedId: module?.watershedId || "",
    location: module?.location || { latitude: 0, longitude: 0 },
  };
}
