import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { Layer, Source } from "react-map-gl";
import { Feature, Geometry } from "geojson";

export interface MapAreaProps {
  id: string;
  geoJson: Feature<Geometry>;
}

const MapArea: FC<MapAreaProps> = ({ id, geoJson }) => {
  const classes = useStyles();

  return (
    <Source id={`${id}-source`} type="geojson" data={geoJson}>
      <Layer
        id={`${id}-area-layer`}
        type="fill"
        paint={{
          "fill-color": "#0080ff",
          "fill-opacity": 0.5,
        }}
      />
      <Layer
        id={`${id}-line-layer`}
        type="line"
        paint={{
          "line-color": "#000",
          "line-width": 3,
        }}
      />
    </Source>
  );
};

const useStyles = makeStyles({});

export default MapArea;

