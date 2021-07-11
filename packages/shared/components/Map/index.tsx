import LocationIcon from "@material-ui/icons/LocationOn";
import React, { FC, useCallback, useEffect } from "react";
import ReactMapGL, { MapEvent, Marker } from "react-map-gl";

import generateId from "../../helpers/generateId";
import useMergeState from "../../hooks/useMergeState";

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

    const rdLocation = props.focusLocation || defaultFocus;
    return rdLocation;
  }, [props.locations, props.focusLocation]);

  const [viewport, setViewport] = useMergeState({
    ...computeDefaultLocation(),
    zoom: props.zoom,
  });

  const onMapClick = useCallback(
    (click: MapEvent) => {
      console.log({ click });
      const [longitude, latitude] = click.lngLat;
      if (props.onClick) props.onClick({ latitude, longitude });
    },
    [props.onClick]
  );

  const onViewPortChange = useCallback((viewport: any) => {
    setViewport(viewport);
  }, []);

  useEffect(updateZoom, [props.zoom]);
  useEffect(updateFocus, [props.focusLocation]);

  function updateZoom() {
    setViewport({ zoom: props.zoom || 0 });
  }

  function updateFocus() {
    const { latitude, longitude } = props.focusLocation || defaultFocus;
    setViewport({ latitude, longitude });
  }

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={onViewPortChange}
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

export const defaultZoom = 7.7;
export const defaultFocus = {
  latitude: 18.85846056967344,
  longitude: -69.33857437339129,
};

(Map as FC<MapProps<any>>).defaultProps = {
  style: "basic-customized",
  locations: [],
  zoom: defaultZoom,
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

