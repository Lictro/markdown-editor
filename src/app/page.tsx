"use client";

import Editor from "@/components/Editor";
import EditorControls from "@/components/EditorControls";
import Navbar from "@/components/Navbar";
import Preview from "@/components/Preview";
import { useEditorState } from "@/hooks/useEditorState";
import { useFileDownload } from "@/hooks/useFileDownload";
import { useHistory } from "@/hooks/useHistory";
import { useScrollSync } from "@/hooks/useScrollSync";

export default function Home() {
  const { fileName, setFilename, editorRef, previewRef } = useEditorState();

  const {
    value: markdown,
    setValue: setMarkdown,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory("# Hello world");

  const { syncScroll } = useScrollSync(editorRef, previewRef);
  const { downloadFile } = useFileDownload(markdown, fileName);

  return (
    <>
      <Navbar
        filename={fileName}
        onFilenameChange={setFilename}
        onDownload={downloadFile}
      />
      <EditorControls
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <div className="grid grid-cols-2 h-[calc(100vh-64px)]">
        <Editor
          value={markdown}
          onChange={setMarkdown}
          textareaRef={editorRef}
          onScroll={() => syncScroll("editor")}
        />
        <Preview
          content={markdown}
          previewRef={previewRef}
          onScroll={() => syncScroll("preview")}
        />
      </div>
    </>
  );
}
