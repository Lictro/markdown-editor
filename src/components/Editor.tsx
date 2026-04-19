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
  return (
    <div className="border-r h-full flex flex-col min-h-0">
      <div className="py-2 px-4 bg-charcoal-dark shrink-0">
        MARKDOWN
      </div>

      <textarea
        ref={textareaRef}
        onScroll={onScroll}
        className="flex-1 min-h-0 w-full p-4 bg-transparent outline-none overflow-auto resize-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
