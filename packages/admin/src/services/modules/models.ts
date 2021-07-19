import Location from "shared/models/Location";
import ModuleModel from "shared/models/Module";
import { Module } from "shared/services/modules/models";

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

export type ModuleRegistration = {
  alias: string;
  phoneNumber: string;
  riverID: string;
  location: Location;
  serial: string;
};

export function toModuleForm(module: ModuleModel): ModuleForm {
  return {
    alias: module?.alias || "",
    serial: module?.serial || "",
    phoneNumber: module?.phoneNumber || "",
    status: module?.state || "",
    watershedId: module?.watershedId || "",
    location: module?.location || { latitude: 0, longitude: 0 },
  };
}

export function fromModuleResponsetoModuleForm(module: Module): ModuleForm {
  return {
    alias: module?.alias || "",
    serial: module?.serial || "",
    phoneNumber: module?.phoneNumber || "",
    status: module?.state || "",
    watershedId: module?.riverID || "",
    location: module?.location || { latitude: 0, longitude: 0 },
  };
}

export function moduleFormToModuleRegistration(moduleForm: ModuleForm): ModuleRegistration {
  const formattedPhoneNumber =
    "+1" +
    moduleForm.phoneNumber.replace("(", "").replace(")", "").replace(" ", "").replace("-", "");

  return {
    location: moduleForm.location,
    riverID: moduleForm.watershedId,
    phoneNumber: formattedPhoneNumber,
    alias: moduleForm.alias,
    serial: moduleForm.serial,
  };
}

