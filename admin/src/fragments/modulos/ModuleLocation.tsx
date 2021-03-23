import { makeStyles, Theme } from "@material-ui/core/styles";
import { LocationOn } from "@material-ui/icons";
import React, { FC, memo, useEffect, useState } from "react";
import ReactMapGL, { InteractiveMap, Marker } from "react-map-gl";

interface ModuleLocationProps {
  isMarkerShown?: boolean;
  onNewMarker: (latitude: number, longitude: number) => void;
}

const ModuleLocation: FC<ModuleLocationProps> = (props) => {
  const classes = useStyles();
  const [markers, setMarkers] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 300,
    latitude: 19.85,
    longitude: -71.6833333,
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

export default memo(ModuleLocation);
