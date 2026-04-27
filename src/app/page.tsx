"use client";

import Editor from "@/components/Editor";
import EditorControls from "@/components/EditorControls";
import MetricsBar from "@/components/MetricsBar";
import Navbar from "@/components/Navbar";
import Preview from "@/components/Preview";
import ShortcutsDialog from "@/components/ShortcutsDialog";
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
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const handleCursorMove = useCallback(() => {
    setCursorUpdateTrigger((prev) => prev + 1);
  }, []);

  useMemo(() => {
    if (viewMode === "editor") {
      previewRef.current?.scrollTo({ top: 0 });
    } else {
      editorRef.current?.scrollTo({ top: 0 });
    }
  }, [viewMode]);

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
        openModal={() => setIsShortcutsOpen(true)}
      />
      <ShortcutsDialog
        open={isShortcutsOpen}
        onOpenChange={setIsShortcutsOpen}
      />

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="sm:grid sm:grid-cols-2 h-full min-h-0 scrollbar">
          <Editor
            value={markdown}
            onChange={setMarkdown}
            textareaRef={editorRef}
            onScroll={() => syncScroll("editor")}
            onCursorMove={handleCursorMove}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <Preview
            content={markdown}
            setViewMode={setViewMode}
            previewRef={previewRef}
            viewMode={viewMode}
            onScroll={() => syncScroll("preview")}
          />
        </div>

        <div className="sticky bottom-0 z-20">
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
      </div>
    </div>
  );
}
