import React, { FC, useCallback } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import LocationIcon from "@material-ui/icons/LocationOn";

type Location = {
  latitude: number;
  longitude: number;
};

type LocationInfo<T> = Location & {
  value?: T;
};

interface MapProps<T> {
  style?: MapStyle;
  locations?: LocationInfo<T>[];
  focusLocation?: Location; 
  render?: (info: LocationInfo<T>) => JSX.Element;
  zoom?: number;
}

// Map shows a map with the provided locations.
function Map<T>(props: MapProps<T>) {
  // RD is the default. In the case there is only one element in locations, the focus is on that location.
  const computeDefaultLocation = useCallback((): Location => {
    const useFirstLocationAsFocus = props.locations.length === 1 && !props.focusLocation;
    if (useFirstLocationAsFocus) return props.locations[0];

    return {
      latitude: 18.483402,
      longitude: -69.929611,
    };
  }, [props.locations, props.focusLocation]);

  const [viewport, setViewport] = React.useState({
    ...computeDefaultLocation(),
    zoom: props.zoom,
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle={mapStyleToUrl(props.style)}
      mapboxApiAccessToken={process.env.mapboxToken}
    >
      {props.locations.map((info) => (
        <Marker latitude={info.latitude} longitude={info.longitude}>
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

