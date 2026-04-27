import { EyeSlashIcon } from "@phosphor-icons/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PreviewProps {
  content: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  viewMode: "editor" | "preview";
  setViewMode: (mode: "editor" | "preview") => void;
}

export default function Preview({
  content,
  previewRef,
  onScroll,
  viewMode,
  setViewMode,
}: PreviewProps) {
  return (
    <div className={`h-full flex flex-col min-h-0 sm:block ${viewMode === "preview" ? "block" : "hidden"}`}>
      <div className="py-2 px-4 bg-charcoal-dark shrink-0 flex justify-between items-center">
        <span>PREVIEW</span>
        <button
          onClick={() => setViewMode("editor")}
          type="button"
          className="md:hidden p-1 hover:bg-charcoal-light rounded text-warm-gray-light text-xs"
        >
          <EyeSlashIcon size={20} weight="bold" />
        </button>
      </div>

      <div
        ref={previewRef}
        onScroll={onScroll}
        className="flex-1 min-h-0 overflow-auto"
      >
        <div
          className="
            prose max-w-none p-4
            prose-headings:text-warm-gray-light
            prose-p:text-warm-gray-light
            prose-strong:text-warm-gray-light
            prose-pre:bg-charcoal-dark
            prose-a:text-gold
            prose-blockquote:text-warm-gray
            prose-blockquote:border-l-gold
            prose-ul:text-warm-gray-light
            prose-ol:text-warm-gray-light
            prose-li:text-warm-gray-light
            prose-ul:marker:text-yellow-200
            prose-ol:marker:text-yellow-200
            prose-th:text-warm-gray-light
            prose-th:font-bold
            prose-td:text-warm-gray-light
        "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
