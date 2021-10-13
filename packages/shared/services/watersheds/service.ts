import axiosInstance from "../axiosInstance";
import Watershed, { fromWaterbodyResponse } from "../../models/Watershed";
import { Waterbody, WaterbodyReport } from "./models";
import { PieChartData } from "../../components/PieChart";
import WqiRating, { toPaperClasification, ratings } from "../../models/WqiRating";
import ModuleState, { moduleStates } from "../../models/ModuleState";
import { Module } from "../modules/models";

export async function getWatersheds(): Promise<Watershed[]> {
  const waterBodiesResponse = await axiosInstance.get<Waterbody[]>(`/rivers`);

  if (!waterBodiesResponse?.data) return [];

  const watersheds: Watershed[] = [];
  waterBodiesResponse.data.forEach((w) => watersheds.push(fromWaterbodyResponse(w)));

  return watersheds;
}

export async function getWatershedById(watershedId: string): Promise<Watershed> {
  const waterBodiesResponse = await axiosInstance.get<Waterbody>(`/rivers/${watershedId}`);
  if (waterBodiesResponse?.data) return null;

  return fromWaterbodyResponse(waterBodiesResponse.data);
}

export async function getWqiRatingsCount(
  watershedId?: string
): Promise<Array<PieChartData<WqiRating>>> {
  const response = await axiosInstance.get<WaterbodyReport[]>(`/reports/modules`);
  if (!response?.data) return [];

  const pieData: PieChartData<WqiRating>[] = [];

  const filteredResponseData = response.data.filter((item) =>
    item.riverID === watershedId ? watershedId : item.riverID
  );

  const ratingCount = {};

  ratings.forEach((rating) => (ratingCount[rating] = 0));

  for (const item of filteredResponseData) {
    const classification = toPaperClasification(item.data[0].wqiClassification);
    ratingCount[classification] += 1;
  }

  for (const item of Object.keys(ratingCount)) {
    if (ratingCount[item] > 0) {
      pieData.push({ id: item, data: item as WqiRating, value: ratingCount[item] });
    }
  }

  return pieData;
}

export async function getModuleStatesCount(
  watershedId: string
): Promise<Array<PieChartData<ModuleState>>> {
  const response = await axiosInstance.get<Module[]>(`/modules`);

  if (!response?.data) return [];

  const pieData: PieChartData<ModuleState>[] = [];
  const filteredResponseData = response.data.filter((item) => item.riverID === watershedId);
  const statesCount = {};

  moduleStates.forEach((state) => (statesCount[state] = 0));

  for (const item of filteredResponseData) {
    const state = item.state;
    statesCount[state] += 1;
  }

  for (const item of Object.keys(statesCount)) {
    if (statesCount[item] > 0) {
      pieData.push({ id: item, data: item as ModuleState, value: statesCount[item] });
    }
  }

  return pieData;
}

