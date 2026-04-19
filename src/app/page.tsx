"use client";

import Editor from "@/components/Editor";
import Navbar from "@/components/Navbar";
import Preview from "@/components/Preview";
import { useState, useRef } from "react";

export default function Home() {
  const [markdown, setMarkdown] = useState("# Hello world");
  const [fileName, setFilename] = useState("untitled.md");

  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const syncScroll = (source: "editor" | "preview") => {
    const editor = editorRef.current;
    const preview = previewRef.current;

    if (!editor || !preview) return;

    let ratio = 0;

    if (source === "editor") {
      ratio =
        editor.scrollTop / (editor.scrollHeight - editor.clientHeight || 1);

      preview.scrollTop = ratio * (preview.scrollHeight - preview.clientHeight);
    } else {
      ratio =
        preview.scrollTop / (preview.scrollHeight - preview.clientHeight || 1);

      editor.scrollTop = ratio * (editor.scrollHeight - editor.clientHeight);
    }
  };

  return (
    <>
      <Navbar filename={fileName} onFilenameChange={setFilename} />
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
