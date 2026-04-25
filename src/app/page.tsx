"use client";

import Editor from "@/components/Editor";
import EditorControls from "@/components/EditorControls";
import MetricsBar from "@/components/MetricsBar";
import Navbar from "@/components/Navbar";
import Preview from "@/components/Preview";
import { getMetrics, getPreviewMetrics } from "@/utils/EditorUtils";
import { useEditorState } from "@/hooks/useEditorState";
import { useFileDownload } from "@/hooks/useFileDownload";
import { useHistory } from "@/hooks/useHistory";
import { useScrollSync } from "@/hooks/useScrollSync";
import { useMemo, useState, useCallback } from "react";

export default function Home() {
  const {
    value: markdown,
    setValue: setMarkdown,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory("# Hello world");

  const { fileName, setFilename, editorRef, previewRef } = useEditorState();
  const { syncScroll } = useScrollSync(editorRef, previewRef);
  const { downloadFile } = useFileDownload(markdown, fileName);
  const [viewMode, setViewMode] = useState<"editor" | "preview">("editor");
  const [cursorUpdateTrigger, setCursorUpdateTrigger] = useState(0);

  const handleCursorMove = useCallback(() => {
    setCursorUpdateTrigger((prev) => prev + 1);
  }, []);

  const metrics = useMemo(() => {
    return getMetrics(markdown, editorRef?.current ?? undefined);
  }, [markdown, cursorUpdateTrigger]);

  const previewMetrics = useMemo(() => {
    return getPreviewMetrics(markdown);
  }, [markdown]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
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
        value={markdown}
        setValue={setMarkdown}
        textareaRef={editorRef}
      />

      <main className="flex-1 overflow-hidden">
        <div className="w-full h-full md:grid md:grid-cols-2">
          <div
            className={`md:col-span-1 ${viewMode === "preview" ? "hidden md:block" : ""}`}
          >
            <Editor
              value={markdown}
              onChange={setMarkdown}
              textareaRef={editorRef}
              onScroll={() => syncScroll("editor")}
              onCursorMove={handleCursorMove}
              setViewMode={setViewMode}
            />
          </div>
          <div
            className={`md:col-span-1 ${viewMode === "editor" ? "hidden md:block" : ""}`}
          >
            <Preview
              content={markdown}
              setViewMode={setViewMode}
              previewRef={previewRef}
              onScroll={() => syncScroll("preview")}
            />
          </div>
        </div>
      </main>

      <MetricsBar
        bytes={metrics.bytes}
        characters={previewMetrics.characters}
        paragraphs={previewMetrics.paragraphs}
        words={metrics.words}
        lines={metrics.lines}
        currentLine={metrics.currentLine}
        currentCol={metrics.currentCol}
        viewMode={viewMode}
      />
    </div>
  );
}
