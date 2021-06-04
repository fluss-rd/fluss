import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import ReactMapGL from "react-map-gl";

interface MapProps {}

const Map: FC<MapProps> = (props) => {
  const classes = useStyles();
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/mikhael1729/ckmlfocjh0aee17qlh7uun9di"
      mapboxApiAccessToken={process.env.mapboxToken}
    />
  );
};

const useStyles = makeStyles({});

export default Map;

