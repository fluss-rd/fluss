import { Button } from "@material-ui/core";
import React, { FC, useRef, useState } from "react";
import Map, { MapRef } from "shared/components/Map";
import Location from "shared/models/Location";

const MapTest: FC = (props) => {
  const def: Location = {
    longitude: -60.0,
    latitude: 30.0,
  };

  const [location, setLocation] = useState<Location | Array<Location>>({ ...def });
  const mapRef = useRef<MapRef>(null);

  const onCoordinates = () => {
    console.log({ location });
    setLocation([...mappedCoordinates[0]]);
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <Map ref={mapRef} zoom={5} focusLocation={location} areas={mappedCoordinates} />
      <Button onClick={onCoordinates}>Go To</Button>
    </div>
  );
};

const coordinates = [
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
];

const mappedCoordinates = coordinates.map((element) =>
  element.map((location) => ({ longitude: location[0], latitude: location[1] }))
);

export default MapTest;
