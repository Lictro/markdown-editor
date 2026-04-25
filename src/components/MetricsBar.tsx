interface MetricsBarProps {
  bytes: number;
  words: number;
  lines: number;
  currentLine: number;
  currentCol: number;
  characters: number;
  paragraphs: number;
  viewMode: "editor" | "preview";
}

export default function MetricsBar({
  bytes,
  words,
  lines,
  currentLine,
  currentCol,
  characters,
  paragraphs,
  viewMode,
}: MetricsBarProps) {
  return (
    <div className="px-4 py-2 text-xs bg-warm-gray-light text-charcoal-dark shrink-0 flex flex-col md:flex-row md:justify-between gap-1 md:gap-0">
      <span
        className={
          viewMode === "preview" ? "hidden md:inline" : "inline md:inline"
        }
      >
        Markdown <strong>{bytes}</strong> bytes <strong>{words}</strong> words{" "}
        <strong>{lines}</strong> lines{" "}
        <span className="ml-2">
          <strong>Ln {currentLine}, Col {currentCol}</strong>
        </span>
      </span>

      <span className={viewMode === "editor" ? "hidden md:inline" : "inline"}>
        HTML <strong>{characters}</strong> characters <strong>{words}</strong>{" "}
        words <strong>{paragraphs}</strong> paragraphs
      </span>
    </div>
  );
}
