import { Editor, DrawPolygonMode, EditingMode } from "react-map-gl-draw";
import React, { FC, useState, useRef, useCallback } from "react";
import { getFeatureStyle, getEditHandleStyle } from "./style";
import DrawEditorToolbar from "./DrawEditorToolbar";

interface DrawEditorProps {
  onSelect?: (area: Array<[number, number]>) => void;
  onRemove?: () => void;
}

const DrawEditor: FC<DrawEditorProps> = (props) => {
  const editorRef = useRef(null);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null);
  const [mode, setMode] = useState<any>(null);

  const onSelect = useCallback((options) => {
    setSelectedFeatureIndex(options && options.selectedFeatureIndex);
  }, []);

  const onDelete = useCallback(() => {
    if (selectedFeatureIndex !== null && selectedFeatureIndex >= 0) {
      editorRef.current.deleteFeatures(selectedFeatureIndex);

      if (props.onRemove) {
        props.onRemove();
      }
    }
  }, [selectedFeatureIndex]);

  const onUpdate = useCallback(
    ({
      editType,
      data,
    }: {
      editType: string;
      data: { geometry: { type: string; coordinates: Array<[number, number]>[] } }[];
    }) => {
      if (editType === "addFeature") {
        setMode(new EditingMode());
        if (props.onSelect) {
          try {
            props.onSelect(data[0].geometry.coordinates[0]);
          } catch (e) {
            console.log(e);
          }
        }
      }
    },
    []
  );

  return (
    <>
      <Editor
        ref={editorRef}
        style={{ width: "100%", height: "100%" }}
        clickRadius={12}
        mode={mode}
        onSelect={onSelect}
        onUpdate={onUpdate}
        editHandleShape={"circle"}
        featureStyle={getFeatureStyle}
        editHandleStyle={getEditHandleStyle}
      />
      <DrawEditorToolbar onDelete={onDelete} onDrawMode={() => setMode(new DrawPolygonMode())} />
    </>
  );
};

export default DrawEditor;

