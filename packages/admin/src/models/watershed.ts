import Location from "./location";

type Watershed = {
  id: string;
  name: string;
  location: Location;
  creationDate: Date;
  updateDate: Date;
  modulesQuantity: number;
  wqi: Wqi; // Water Quality Index.
};

export type Wqi = { value: number; rating: string };

export function mockWatersheds(): Watershed[] {
  return [
    {
      id: "WS-1",
      name: "Yaque del Norte",
      location: { latitude: 19.8401, longitude: -71.687 },
      modulesQuantity: 3,
      updateDate: new Date(Date.now()),
      creationDate: new Date(Date.now()),
      wqi: { value: 250, rating: "Media" },
    },
    {
      id: "WS-2",
      name: "Laguna Oviedo",
      location: { latitude: 17.75, longitude: -71.3666667 },
      modulesQuantity: 3,
      updateDate: new Date(Date.now()),
      creationDate: new Date(Date.now()),
      wqi: { value: 250, rating: "Media" },
    },
  ];
}

export default Watershed;

