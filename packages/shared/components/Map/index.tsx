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
import computeCoordinatesCenter from "./computeCoordinatesCenter";
import DrawEditor, { DrawEditorMode, DrawEditorProps } from "./DrawEditor";
import MapStyle, { mapStyleToUrl } from "./MapStyle";

export type LocationInfo<T> = Location & {
  value?: T;
};

export interface MapProps<T> {
  style?: MapStyle;
  DrawEditorProps?: Partial<DrawEditorProps>;
  locations?: LocationInfo<T>[];
  focusLocation?: Location | Array<Location>;
  render?: (info: LocationInfo<T>) => JSX.Element;
  onClick?: (location: Location) => void;
  zoom?: number;
  enableAreaDrawing?: boolean;
  showAreaDrawingToolbar?: boolean;
  areas?: Array<Location>[];
  onSelectArea?: (area: Array<[number, number]>) => void;
  onDeleteArea?: () => void;
  areaDrawingMode?: DrawEditorMode;
}

export interface MapRef {
  viewport: ViewportProps;
  setViewport: (newState: Partial<ViewportProps> | Prev<ViewportProps>) => void;
  mapRef: React.MutableRefObject<undefined>;
}

const mapboxToken: string = process.env.mapboxToken;

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
    console.log("viewpor change");
    setViewport(viewport);
  }, []);

  useImperativeHandle(ref, returnReferences, [viewport, setViewport]);
  useEffect(updateZoom, [props.zoom]);
  useEffect(updateFocus, [props.focusLocation]);

  function returnReferences(): MapRef {
    return {
      viewport,
      setViewport,
      mapRef,
    };
  }

  function updateZoom() {
    console.log("Update zoom");
    setViewport({ zoom: props.zoom || 0 });
  }

  function updateFocus() {
    console.log("Update focus");
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

  console.log("Inside MAP");

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={onViewPortChange}
      mapStyle={mapStyleToUrl(props.style)}
      mapboxApiAccessToken={mapboxToken}
      onClick={onMapClick}
      ref={mapRef}
    >
      {props.locations.map((info) => (
        <Marker key={generateId("marker")} latitude={info.latitude} longitude={info.longitude}>
          {props.render(info)}
        </Marker>
      ))}
      {(props.enableAreaDrawing || props.areas) && (
        <DrawEditor
          areas={props.areas}
          onRemove={props.onDeleteArea}
          onSelect={props.onSelectArea}
          mode={props.areaDrawingMode}
          showPanel={props.showAreaDrawingToolbar}
          {...props.DrawEditorProps}
        />
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
  areaDrawingMode: "view",
  locations: [],
  areas: [],
  showAreaDrawingToolbar: false,
  zoom: defaultZoom,
  render: () => <LocationIcon color="primary" />,
  focusLocation: null,
  enableAreaDrawing: false,
};

export default ForwardedMap;
