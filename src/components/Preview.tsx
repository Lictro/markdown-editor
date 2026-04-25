import { getPreviewMetrics } from "@/utils/EditorUtils";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PreviewProps {
  content: string;
  previewRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
}

export default function Preview({
  content,
  previewRef,
  onScroll,
}: PreviewProps) {
  const metrics = useMemo(() => {
    return getPreviewMetrics(content);
  }, [content]);

  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="py-2 px-4 bg-charcoal-dark shrink-0">PREVIEW</div>

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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
      <div className="px-4 py-2 text-xs bg-warm-gray-light text-charcoal-dark shrink-0 flex justify-end">
        <span>
          HTML <strong>{metrics.characters}</strong> characters{" "}
          <strong>{metrics.words}</strong> words{" "}
          <strong>{metrics.paragraphs}</strong> paragraphs
        </span>
      </div>
    </div>
  );
}
