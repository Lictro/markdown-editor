interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  return (
    <div className="border-r">
      <div className="py-2 px-4 bg-charcoal-dark">MARKDOWN</div>
      <textarea
        className="w-full h-full p-4 bg-transparent outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
