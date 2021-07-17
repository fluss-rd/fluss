import axiosInstance from "../axiosInstance";
import Watershed, { fromWaterbodyResponse } from "../../models/Watershed";
import { Waterbody, WaterbodyReport } from "./models";
import PieChart, { PieChartData } from "../../components/PieChart";
import WqiRating, { toPaperClasification, ratings } from "../../models/WqiRating";

export async function getWatersheds(): Promise<Watershed[]> {
  const waterBodiesResponse = await axiosInstance.get<Waterbody[]>(`/rivers`);

  const watersheds: Watershed[] = [];
  if (waterBodiesResponse?.data)
    waterBodiesResponse.data.forEach((w) => watersheds.push(fromWaterbodyResponse(w)));

  return watersheds;
}

export async function getWqiRatingsCount(
  watershedId: string
): Promise<Array<PieChartData<WqiRating>>> {
  const response = await axiosInstance.get<WaterbodyReport[]>(`/reports/modules`);

  const pieData: PieChartData<WqiRating>[] = [];
  if (response?.data) {
    const filteredResponseData = response.data.filter((item) => item.riverID === watershedId);
    const ratingCount = {};
    ratings.forEach((rating) => (ratingCount[rating] = 0));

    console.log({ ratingCount });

    for (const item of filteredResponseData) {
      const classification = toPaperClasification(item.data[0].wqiClassification);
      console.log({ classification });
      ratingCount[classification] += 1;
      console.log({ ratingCount });
    }

    for (const item of Object.keys(ratingCount)) {
      if (ratingCount[item] > 0) {
        pieData.push({ id: item, data: item as WqiRating, value: ratingCount[item] });
      }
    }
  }

  return pieData;
}

