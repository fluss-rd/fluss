import React, { FC, useCallback, useRef, useState, useEffect } from "react";
import { DrawPolygonMode, EditingMode, Editor } from "react-map-gl-draw";
import Location from "shared/models/Location";

import DrawEditorToolbar from "./DrawEditorToolbar";
import { getEditHandleStyle, getFeatureStyle } from "./style";

export type DrawEditorMode = "edition" | "view";

type EditorGeoJsonData = {
  geometry: {
    type: string;
    coordinates: Array<[number, number]>[];
  };
};

type EditorGeoJson = {
  editType: string;
  data: EditorGeoJsonData[];
};

export interface DrawEditorProps {
  areas?: Array<Location[]>;
  mode?: DrawEditorMode;
  showPanel?: boolean;
  onSelect?: (area: Array<[number, number]>) => void;
  onRemove?: () => void;
}

const DrawEditor: FC<DrawEditorProps> = (props) => {
  const editorRef = useRef(null);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null);
  const [mode, setMode] = useState<any>(props.mode === "view" ? null : new DrawPolygonMode());
  const coordinates: any = props.areas?.length ? computeCoordinates() : [];
  const isInEditionMode = mode instanceof DrawPolygonMode;

  useEffect(updateMode, [props.mode]);

  const onSelect = (options: any) => {
    console.log({ options });
    setSelectedFeatureIndex(options && options.selectedFeatureIndex);
  };

  const onDelete = () => {
    console.log({ selectedFeatureIndex });
    if (selectedFeatureIndex !== null && selectedFeatureIndex >= 0) {
      console.log("hey");
      editorRef.current.deleteFeatures(selectedFeatureIndex);

      if (props.onRemove) {
        props.onRemove();
      }
    }
  };

  const onUpdate = ({ editType, data }: EditorGeoJson) => {
    console.log({ editType });
    if (editType === "addFeature") {
      console.log({ data });
      setMode(new EditingMode());
      console.log({ data });

      if (props.onSelect) {
        try {
          props.onSelect(data[0].geometry.coordinates[0]);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  function computeCoordinates() {
    return props.areas.map((area) => area.map(({ longitude, latitude }) => [longitude, latitude]));
  }

  function updateMode() {
    const updatedMode = props.mode === "view" ? null : new DrawPolygonMode();
    setMode(updatedMode);
  }

  function computeFeatures() {
    if (!coordinates) return undefined;

    if (coordinates[0]?.length) {
      const hmm = coordinates.map((coordinate: any) => ({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          // These coordinates outline Maine.
          coordinates: [coordinate],
        },
      }));
      //return [
      //{
      //type: "Feature",
      //properties: {},
      //geometry: {
      //type: "Polygon",
      //// These coordinates outline Maine.
      //coordinates,
      //},
      //},
      //];
      return hmm;
    }

    return undefined;
  }

  console.log({ featuers: computeFeatures() });

  return (
    <>
      <Editor
        ref={editorRef}
        style={{ width: "100%", height: "100%" }}
        features={computeFeatures() as any}
        clickRadius={12}
        mode={mode}
        onSelect={onSelect}
        onUpdate={onUpdate}
        editHandleShape={"circle"}
        featureStyle={getFeatureStyle}
        editHandleStyle={getEditHandleStyle}
      />
      {props.showPanel && (
        <DrawEditorToolbar
          mode={isInEditionMode ? "edition" : "view"}
          onDelete={onDelete}
          onDrawMode={() => {
            if (isInEditionMode) setMode(null);
            else setMode(new DrawPolygonMode());
          }}
        />
      )}
    </>
  );
};

export default DrawEditor;

