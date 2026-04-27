import { EyeIcon } from "@phosphor-icons/react";
import { useCallback } from "react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onScroll: () => void;
  onCursorMove: () => void;
  setViewMode: (mode: "editor" | "preview") => void;
}

export default function Editor({
  value,
  onChange,
  textareaRef,
  onScroll,
  onCursorMove,
  setViewMode,
}: EditorProps) {
  const handleCursorPosition = useCallback(() => {
    onCursorMove();
  }, [onCursorMove]);

  return (
    <div className="border-r border-warm-gray-light h-full flex flex-col min-h-0">
      <div className="py-2 px-4 bg-charcoal-dark shrink-0 flex justify-between items-center">
        <span>MARKDOWN</span>
        <button
          onClick={() => setViewMode("preview")}
          type="button"
          className="md:hidden p-1 hover:bg-charcoal-light rounded text-warm-gray-light text-xs"
        >
          <EyeIcon size={20} weight="bold" />
        </button>
      </div>

      <textarea
        ref={textareaRef}
        onScroll={onScroll}
        onClick={handleCursorPosition}
        onKeyUp={handleCursorPosition}
        onMouseUp={handleCursorPosition}
        onSelect={handleCursorPosition}
        className="flex-1 min-h-0 w-full p-4 bg-transparent outline-none overflow-auto resize-none"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          handleCursorPosition();
        }}
      />
    </div>
  );
}
