import { getMetrics } from "@/utils/EditorUtils";
import { useMemo } from "react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onScroll: () => void;
}

export default function Editor({
  value,
  onChange,
  textareaRef,
  onScroll,
}: EditorProps) {
  const metrics = useMemo(() => {
    return getMetrics(value, textareaRef?.current ?? undefined);
  }, [value, textareaRef?.current?.selectionStart]);

  return (
    <div className="border-r border-warm-gray-light h-full flex flex-col min-h-0">
      <div className="py-2 px-4 bg-charcoal-dark shrink-0">MARKDOWN</div>

      <textarea
        ref={textareaRef}
        onScroll={onScroll}
        className="flex-1 min-h-0 w-full p-4 bg-transparent outline-none overflow-auto resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="px-4 py-2 text-xs bg-warm-gray-light text-charcoal-dark shrink-0">
        <span>
          Markdown <strong>{metrics.bytes}</strong> bytes{" "}
          <strong>{metrics.words}</strong> words{" "}
          <strong>{metrics.lines}</strong> lines
        </span>

        <span className="ml-2">
          <strong>
            Ln {metrics.currentLine}, Col {metrics.currentCol}
          </strong>
        </span>
      </div>
    </div>
  );
}
