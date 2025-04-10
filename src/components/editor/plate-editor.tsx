"use client";

import { Plate } from "@udecode/plate/react";
import React from "react";
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { SettingsDialog } from "@/components/editor/settings";
import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";

interface PlateEditorProps {
  onChange?: (value: string) => void;
}

const PlateEditor: FC<PlateEditorProps> = ({ onChange }) => {
  const editor = useCreateEditor();

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        onValueChange={({ value }) => {
          if (onChange) {
            onChange(JSON.stringify(value));
          }
        }}
        editor={editor}
      >
        <EditorContainer>
          <Editor variant="default" />
        </EditorContainer>
        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
};

export default PlateEditor;
