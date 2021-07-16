import Location from "./Location";
import { Feature, Geometry } from "geojson";

type GeoJsonArea = {
  id: string;
  name: string;
  focusLocation: Location;
  geoJson: Feature<Geometry>;
};

export default GeoJsonArea;
