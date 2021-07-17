import axiosInstance from "../axiosInstance";
import ModuleModel, { fromModuleResponse } from "../../models/Module";
import { ModuleReport, Module } from "./models";

export async function getModules(): Promise<ModuleModel[]> {
  const reportsModulesResponse = await axiosInstance.get<ModuleReport[]>(`/reports/modules`);
  const modulesResponse = await axiosInstance.get<Module[]>(`/modules`);

  const modules: ModuleModel[] = [];

  if (reportsModulesResponse?.data && modulesResponse?.data) {
    const reports = sortByProperty(reportsModulesResponse.data, "moduleID");
    const modulesData = sortByProperty(modulesResponse.data, "moduleID");

    console.log({ l1: reports.length });
    console.log({ l2: modulesData.length });

    for (let index = 0; index < reports.length; index++) {
      const moduleResponse = modulesData[index];
      const reportResponse = reports[index];
      modules.push(fromModuleResponse(moduleResponse, reportResponse));
    }
  }

  return modules;
}

const sortByProperty = <T>(
  data: T[],
  keyToSort: keyof T,
  direction: "ascending" | "descending" | "none" = "ascending"
) => {
  if (direction === "none") {
    return data;
  }
  const compare = (objectA: T, objectB: T) => {
    const valueA = objectA[keyToSort];
    const valueB = objectB[keyToSort];

    if (valueA === valueB) {
      return 0;
    }

    if (valueA > valueB) {
      return direction === "ascending" ? 1 : -1;
    } else {
      return direction === "ascending" ? -1 : 1;
    }
  };

  return data.slice().sort(compare);
};

