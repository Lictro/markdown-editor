"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const shortcuts = [
  { label: "Bold", keys: ["Command", "Shift", "Alphabet-B"] },
  { label: "Italic", keys: ["Command", "Shift", "Alphabet-I"] },
  { label: "Strikethrough", keys: ["Command", "Shift", "Alphabet-S"] },
  { label: "Link", keys: ["Command", "Shift", "Alphabet-L"] },
  { label: "Ordered List", keys: ["Command", "Shift", "Alphabet-O"] },
  { label: "Unordered List", keys: ["Command", "Shift", "Alphabet-U"] },
  { label: "Code Block", keys: ["Command", "Shift", "Alphabet-K"] },
  { label: "Blockquote", keys: ["Command", "Shift", "Alphabet-Q"] },
  { label: "Heading", keys: ["Command", "Shift", "Alphabet-H"] },
  { label: "Table", keys: ["Command", "Shift", "Alphabet-T"] },
  { label: "Image", keys: ["Command", "Shift", "Alphabet-G"] },
];

function ShortcutKey({ keyName }: { keyName: string }) {
  const keySizes: Record<string, { width: number; height: number }> = {
    Command: { width: 45, height: 30 },
    Shift: { width: 60, height: 30 },
    Default: { width: 30, height: 30 },
  };

  const { width, height } = keySizes[keyName] ?? keySizes.Default;

  return (
    <Image
      src={`/keys/${keyName}.svg`}
      alt={keyName}
      width={width * 1.1}
      height={height * 1.1}
      className="inline-block"
    />
  );
}

interface ShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShortcutsDialog({
  open,
  onOpenChange,
}: ShortcutsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-3xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Use these shortcuts to format text quickly while editing Markdown.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.label}
              className="flex flex-col gap-3 rounded-md border border-warm-gray-light bg-warm-gray-light/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-sm font-medium text-charcoal-dark">
                {shortcut.label}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {shortcut.keys.map((keyName, index) => (
                  <span
                    key={`${keyName}-${index}`}
                    className="flex items-center gap-2"
                  >
                    <ShortcutKey keyName={keyName} />
                    {index < shortcut.keys.length - 1 && (
                      <span className="text-xs text-charcoal-dark">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
