import { useState, useRef } from "react";

export function useEditorState() {
  const [fileName, setFilename] = useState("untitled.md");

  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  return {
    fileName,
    setFilename,
    editorRef,
    previewRef,
  };
}
