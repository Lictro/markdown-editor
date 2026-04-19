import ReactMarkdown from "react-markdown";

interface PreviewProps {
  content: string;
}

export default function Preview({ content }: PreviewProps) {
  return (
    <div>
      <div className="py-2 px-4 bg-charcoal-dark">PREVIEW</div>
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
        "
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
