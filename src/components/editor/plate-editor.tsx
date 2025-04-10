"use client";

import { Plate } from "@udecode/plate/react";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { SettingsDialog } from "@/components/editor/settings";
import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";

function PlateEditor() {
  const editor = useCreateEditor();

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <EditorContainer>
          <Editor variant="default" />
        </EditorContainer>
        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}

export default PlateEditor;
