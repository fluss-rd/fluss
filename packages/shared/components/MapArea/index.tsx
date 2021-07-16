import { makeStyles } from "@material-ui/core/styles";
import { Feature, Geometry } from "geojson";
import React, { FC } from "react";
import { Layer, Source } from "react-map-gl";

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
          "fill-color": "#E1D437",
          "fill-opacity": 0.5,
        }}
      />
      <Layer
        id={`${id}-line-layer`}
        type="line"
        paint={{
          "line-color": "#99912E",
          "line-width": 1,
        }}
      />
    </Source>
  );
};

const useStyles = makeStyles({});

export default MapArea;
