import LocationIcon from "@material-ui/icons/LocationOn";
import { easeCubic } from "d3-ease";
import React, {
  FC,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import ReactMapGL, { FlyToInterpolator, MapEvent, Marker, ViewportProps } from "react-map-gl";

import generateId from "../../helpers/generateId";
import useMergeState, { Prev } from "../../hooks/useMergeState";
import Location from "../../models/Location";
import MapArea from "../MapArea";
import computeCoordinatesCenter from "./computeCoordinatesCenter";
import DrawEditor from "./DrawEditor";
import MapStyle, { mapStyleToUrl } from "./MapStyle";

export type LocationInfo<T> = Location & {
  value?: T;
};

export interface MapProps<T> {
  style?: MapStyle;
  locations?: LocationInfo<T>[];
  areas?: Array<Location>[];
  focusLocation?: Location | Array<Location>;
  render?: (info: LocationInfo<T>) => JSX.Element;
  onClick?: (location: Location) => void;
  zoom?: number;
  enableDraw?: boolean;
  onSelectArea?: (area: Array<[number, number]>) => void;
  onDeleteArea?: () => void;
}

export interface MapRef {
  viewport: ViewportProps;
  setViewport: (newState: Partial<ViewportProps> | Prev<ViewportProps>) => void;
  flyTo: (
    location: Location | Array<Location>,
    config?: Omit<ViewportProps, "latitude" | "longitude">
  ) => void;
  mapRef: React.MutableRefObject<undefined>;
}

// Map shows a map with the provided locations.
function Map<T>(props: MapProps<T>, ref: ForwardedRef<MapRef>) {
  const mapRef = useRef();
  const computeDefaultLocation = useCallback((): Location => {
    const canUseFirstLocation = !props.focusLocation && props.locations.length >= 1;
    if (canUseFirstLocation) return props.locations[0];

    const rdLocation = Array.isArray(props.focusLocation)
      ? computeCoordinatesCenter(props.focusLocation)
      : props.focusLocation || defaultFocus;

    return rdLocation;
  }, [props.locations, props.focusLocation]);

  const [viewport, setViewport] = useMergeState<ViewportProps>({
    ...computeDefaultLocation(),
    zoom: props.zoom,
  });

  const onMapClick = useCallback(
    (click: MapEvent) => {
      const [longitude, latitude] = click.lngLat;
      if (props.onClick) props.onClick({ latitude, longitude });
    },
    [props.onClick]
  );

  const onViewPortChange = useCallback((viewport: any) => {
    setViewport(viewport);
  }, []);

  const flyTo = (
    location: Location | Array<Location>,
    config: Omit<ViewportProps, "latitude" | "longitude"> = {
      zoom: 5,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    }
  ) => {
    const coordinates = Array.isArray(location) ? computeCoordinatesCenter(location) : location;

    setViewport({
      ...viewport,
      ...coordinates,
      ...config,
    });
  };

  const coordinates = props.areas.map((area) =>
    area.map(({ longitude, latitude }) => [longitude, latitude])
  );

  useImperativeHandle(ref, returnReferences, [viewport, setViewport]);

  useEffect(updateZoom, [props.zoom]);

  useEffect(updateFocus, [props.focusLocation]);

  function returnReferences(): MapRef {
    return {
      viewport,
      setViewport,
      flyTo,
      mapRef,
    };
  }

  function updateZoom() {
    setViewport({ zoom: props.zoom || 0 });
  }

  function updateFocus() {
    const coordinates = Array.isArray(props.focusLocation)
      ? computeCoordinatesCenter(props.focusLocation)
      : props.focusLocation || defaultFocus;

    setViewport({
      ...coordinates,
      zoom: props.zoom,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    });
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
      ref={mapRef}
    >
      {props.locations.map((info) => (
        <Marker key={generateId("marker")} latitude={info.latitude} longitude={info.longitude}>
          {props.render(info)}
        </Marker>
      ))}
      {props.areas && (
        <MapArea
          key={"areas"}
          id={"areas"}
          geoJson={{
            type: "Feature",
            properties: {},
            geometry: {
              type: "Polygon",
              // These coordinates outline Maine.
              coordinates,
            },
          }}
        />
      )}
      {props.enableDraw && (
        <DrawEditor onRemove={props.onDeleteArea} onSelect={props.onSelectArea} />
      )}
    </ReactMapGL>
  );
}

const ForwardedMap = forwardRef(Map);

export const defaultZoom = 7.7;

export const defaultFocus = {
  latitude: 18.85846056967344,
  longitude: -69.33857437339129,
};

(ForwardedMap as FC<MapProps<any>>).defaultProps = {
  style: "basic-customized",
  locations: [],
  areas: [],
  zoom: defaultZoom,
  render: () => <LocationIcon color="primary" />,
  focusLocation: null,
  enableDraw: false,
};

export default ForwardedMap;
