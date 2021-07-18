import LocationIcon from "@material-ui/icons/LocationOn";
import React, { FC, useCallback } from "react";
import ReactMapGL, { MapEvent, Marker } from "react-map-gl";
import generateId from "shared/helpers/generateId";

export type Location = {
  latitude: number;
  longitude: number;
};

export type LocationInfo<T> = Location & {
  value?: T;
};

interface MapProps<T> {
  style?: MapStyle;
  locations?: LocationInfo<T>[];
  focusLocation?: Location;
  render?: (info: LocationInfo<T>) => JSX.Element;
  onClick?: (location: Location) => void;
  zoom?: number;
}

// Map shows a map with the provided locations.
function Map<T>(props: MapProps<T>) {
  const computeDefaultLocation = useCallback((): Location => {
    const canUseFirstLocation = !props.focusLocation && props.locations.length >= 1;
    if (canUseFirstLocation) return props.locations[0];

    const rdLocation = {
      latitude: 18.483402,
      longitude: -69.929611,
    };
    return rdLocation;
  }, [props.locations, props.focusLocation]);

  const [viewport, setViewport] = React.useState({
    ...computeDefaultLocation(),
    zoom: props.zoom,
  });

  const onMapClick = (click: MapEvent) => {
    const [longitude, latitude] = click.lngLat;
    if (props.onClick) props.onClick({ latitude, longitude });
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle={mapStyleToUrl(props.style)}
      mapboxApiAccessToken={process.env.mapboxToken}
      onClick={onMapClick}
    >
      {props.locations.map((info) => (
        <Marker key={generateId("marker")} latitude={info.latitude} longitude={info.longitude}>
          {props.render(info)}
        </Marker>
      ))}
    </ReactMapGL>
  );
}

(Map as FC<MapProps<any>>).defaultProps = {
  style: "basic-customized",
  locations: [],
  zoom: 15,
  render: () => <LocationIcon color="primary" />,
  focusLocation: null,
};

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
