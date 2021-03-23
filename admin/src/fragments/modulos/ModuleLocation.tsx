import { makeStyles, Theme } from "@material-ui/core/styles";
import { LocationOn } from "@material-ui/icons";
import React, { FC, memo, useEffect, useState } from "react";
import ReactMapGL, { InteractiveMap, Marker } from "react-map-gl";

interface ModuleLocationProps {
  isMarkerShown?: boolean;
  onNewMarker: (latitude: number, longitude: number) => void;
  height?: number | string;
  width?: number | string;
  latitude?: number;
  longitude?: number;
}

const ModuleLocation: FC<ModuleLocationProps> = (props) => {
  const classes = useStyles();
  const [markers, setMarkers] = useState([]);
  const [viewport, setViewport] = useState({
    width: props.width,
    height: props.height,
    latitude: props.latitude,
    longitude: props.longitude,
    zoom: 10,
  });

  useEffect(() => {
    const { latitude, longitude } = viewport;
    setMarkers((markers) => [{ longitude, latitude }]);
    props.onNewMarker(latitude, longitude);
  }, []);

  function handleClick({ lngLat: [longitude, latitude] }) {
    setMarkers((markers) => [{ longitude, latitude }]);
    props.onNewMarker(latitude, longitude);
  }

  function onViewportChange(nextViewport: any) {
    setViewport(nextViewport);
  }

  return (
    <InteractiveMap
      {...viewport}
      onClick={handleClick}
      onViewportChange={onViewportChange}
      mapStyle="mapbox://styles/mikhael1729/ckmlfocjh0aee17qlh7uun9di"
      mapboxApiAccessToken={process.env.mapboxToken}
    >
      {markers.map((m, i) => (
        <Marker {...m} key={i}>
          <LocationOn color="secondary" />
        </Marker>
      ))}
    </InteractiveMap>
  );
};

const useStyles = makeStyles(() => ({}));

const Memoized: FC<ModuleLocationProps> = memo(ModuleLocation);
(Memoized as any).defaultProps = {
  width: "100%",
  height: 300,
  latitude: 19.85,
  longitude: -71.68333,
};

export default Memoized;
