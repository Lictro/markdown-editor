"use client";

import Editor from "@/components/Editor";
import Navbar from "@/components/Navbar";
import Preview from "@/components/Preview";
import { useState } from "react";

export default function Home() {
  const [markdown, setMarkdown] = useState("# Hello world");
  const [fileName, setFilename] = useState("untitled.md");

  const downloadFile = () => {
    alert("downloading...");
  };

  return (
    <>
      <Navbar filename={fileName} onFilenameChange={setFilename} />
      <div className="grid grid-cols-2 h-screen">
        <Editor value={markdown} onChange={setMarkdown} />
        <Preview content={markdown} />
      </div>
    </>
  );
}
