import Location from "./location";
import Wqi from "./wqi";

type Watershed = {
  id: string;
  name: string;
  location: Location;
  creationDate: Date;
  updateDate: Date;
  modulesQuantity: number;
  wqi: Wqi; // Water Quality Index.
};

export function mockWatersheds(): Watershed[] {
  return [
    {
      id: "WS-1",
      name: "Yaque del Norte",
      location: { latitude: 19.8401, longitude: -71.687 },
      modulesQuantity: 2,
      updateDate: new Date(2021, 6, 11),
      creationDate: new Date(2021, 6, 11),
      wqi: { value: 250, rating: "moderate" },
    },
    {
      id: "WS-2",
      name: "Laguna Oviedo",
      location: { latitude: 17.75, longitude: -71.3666667 },
      modulesQuantity: 3,
      updateDate: new Date(2021, 6, 11),
      creationDate: new Date(2021, 6, 11),
      wqi: { value: 250, rating: "moderate" },
    },
  ];
}

export default Watershed;
