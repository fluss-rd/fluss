import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import ReactMapGL from "react-map-gl";

interface MapProps {
  style?: MapStyle;
}

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
      mapStyle={mapStyleToUrl(props.style)}
      mapboxApiAccessToken={process.env.mapboxToken}
    />
  );
};

Map.defaultProps = {
  style: "basic-customized",
};

const useStyles = makeStyles({});

export default Map;

export type MapStyle = typeof mapStyles[number];

export const mapStyles = ["decimal", "outdoors", "streets", "basic-customized"] as const;

export function mapStyleToUrl(style: MapStyle) {
  switch (style) {
    case "streets":
      return "mapbox://styles/mikhael1729/ckpmxdd8u0tli18r6nab32jpx";
    case "decimal":
      return "mapbox://styles/mikhael1729/ckmlfocjh0aee17qlh7uun9di";
    case "outdoors":
      return "mapbox://styles/mikhael1729/ckpmx6jmf0dnq18r0ynxmrscr";
    default:
      return "mapbox://styles/mikhael1729/ckpmy16f43v7w17p81eqkytt0";
  }
}

