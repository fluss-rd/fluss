import React, { FC, useRef } from "react";
import Map, { MapRef } from "shared/components/Map";
import GeoJsonArea from "shared/models/GeoJsonArea";
import { Button } from "@material-ui/core";
import useMergeState from "shared/hooks/useMergeState";

const MapTest: FC = (props) => {
  const [location, setLocation] = useMergeState({ longitude: -60.0, latitude: 30.0 });
  const mapRef = useRef<MapRef>(null);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <Map ref={mapRef} zoom={5} focusLocation={location} areas={[geoJson]} />
      <Button
        onClick={() => {
          mapRef.current.flyTo({ longitude: -68.137343, latitude: 45.137451 });
        }}
      >
        Go To
      </Button>
    </div>
  );
};

const geoJson: GeoJsonArea = {
  id: "lugar",
  focusLocation: { longitude: -68.137343, latitude: 45.137451 },
  name: "Lugar",
  geoJson: {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Polygon",
      // These coordinates outline Maine.
      coordinates: [
        [
          [-67.13734, 45.13745],
          [-66.96466, 44.8097],
          [-68.03252, 44.3252],
          [-69.06, 43.98],
          [-70.11617, 43.68405],
          [-70.64573, 43.09008],
          [-70.75102, 43.08003],
          [-70.79761, 43.21973],
          [-70.98176, 43.36789],
          [-70.94416, 43.46633],
          [-71.08482, 45.30524],
          [-70.66002, 45.46022],
          [-70.30495, 45.91479],
          [-70.00014, 46.69317],
          [-69.23708, 47.44777],
          [-68.90478, 47.18479],
          [-68.2343, 47.35462],
          [-67.79035, 47.06624],
          [-67.79141, 45.70258],
          [-67.13734, 45.13745],
        ],
      ],
    },
  },
};

export default MapTest;

