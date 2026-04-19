import { DownloadSimpleIcon, FileIcon } from "@phosphor-icons/react";
import { useState } from "react";

interface NavbarProps {
  filename: string;
  onFilenameChange: (name: string) => void;
  onDownload?: () => void;
}

export default function Navbar({
  filename,
  onFilenameChange,
  onDownload,
}: NavbarProps) {
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(filename);

  const handleBlur = () => {
    setEditing(false);
    onFilenameChange(tempName.trim() || "untitled.md");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gold">
      <div className="flex items-center gap-4">
        <span className="font-bold text-charcoal">MARKDOWN</span>

        <div className="flex items-center pl-4 gap-2 text-charcoal border-l-2 border-charcoal">
          <FileIcon size={26} />
          {!editing ? (
            <span
              onClick={() => {
                setTempName(filename);
                setEditing(true);
              }}
              className="text-sm cursor-pointer hover:opacity-70"
            >
              {filename}
            </span>
          ) : (
            <input
              autoFocus
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleBlur();
              }}
              className="text-sm bg-transparent border-b border-black/40 outline-none"
            />
          )}
        </div>
      </div>

      <button
        onClick={onDownload}
        className="flex items-center justify-center gap-2 bg-charcoal text-gold px-4 py-1.5 rounded hover:opacity-80 transition cursor-pointer"
      >
        <DownloadSimpleIcon size={18} />
        <span>Download</span>
      </button>
    </nav>
  );
}
