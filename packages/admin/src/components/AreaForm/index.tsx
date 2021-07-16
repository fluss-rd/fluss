import { Control, UseFormMethods, useWatch } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { Feature, Geometry } from "geojson";
import Map from "shared/components/Map";

interface AreaFormProps {}

const AreaForm: FC<AreaFormProps> = (props) => {
  const classes = useStyles();

  return <div></div>;
};

interface RenderMapProps {
  control: Control<{ area: Feature<Geometry> }>;
  onSelectArea: (location: Feature<Geometry>) => void;
  defaultValue?: Feature<Geometry>;
}

const useStyles = makeStyles({});

export default AreaForm;

