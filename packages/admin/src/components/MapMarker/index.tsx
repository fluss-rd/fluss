import { LocationOn } from "@material-ui/icons";
import React, { FC, useState } from "react";
import { InteractiveMap, MapEvent, Marker } from "react-map-gl";
import generateId from "shared/helpers/generateId";
import useMergeState from "shared/hooks/useMergeState";

import { Location, MapStyle, mapStyleToUrl } from "../Map";

interface MapMarkerProps {
  focusLocation?: Location;
  style?: MapStyle;
  onNewMarker?: (location: Location) => void;
  disabled?: boolean; // Disables marks on the map.
  zoom?: number;
  markers?: Location[];
}

const MapMarker: FC<MapMarkerProps> = (props) => {
  const [viewport, setViewport] = useMergeState({
    width: "100%",
    height: "100%",
    latitude: props.focusLocation.latitude,
    longitude: props.focusLocation.longitude,
    zoom: 10,
  });

  const onMapClick = (click: MapEvent) => {
    const [latitude, longitude] = click.lngLat;
    if (props.onNewMarker) props.onNewMarker({ latitude, longitude });
  };

  const onViewportChange = (newViewPort: any) => {
    setViewport(newViewPort);
  };

  return (
    <InteractiveMap
      {...viewport}
      onClick={onMapClick}
      onViewportChange={onViewportChange}
      mapStyle={mapStyleToUrl(props.style)}
      mapboxApiAccessToken={process.env.mapboxToken}
    >
      {props.markers.map(({ latitude, longitude }) => (
        <Marker latitude={latitude} longitude={longitude} key={generateId("marker")}>
          <LocationOn color="primary" style={{ zIndex: 1 }} />
        </Marker>
      ))}
    </InteractiveMap>
  );
};

MapMarker.defaultProps = {
  style: "basic-customized",
  zoom: 15,
  disabled: false,
  markers: [],
  focusLocation: {
    latitude: 18.483402,
    longitude: -69.929611,
  },
};

export default MapMarker;
