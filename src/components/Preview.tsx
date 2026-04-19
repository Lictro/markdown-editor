import ReactMarkdown from "react-markdown";

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
            prose-code:text-gold
            prose-pre:bg-charcoal-dark
            prose-pre:text-warm-gray-light
            prose-a:text-gold
            prose-blockquote:text-warm-gray
            prose-ul:text-warm-gray-light
            prose-ol:text-warm-gray-light
            prose-li:text-warm-gray-light
            prose-ul:marker:text-yellow-200
            prose-ol:marker:text-yellow-200
        "
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
