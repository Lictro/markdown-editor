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
  { label: "Bold", keys: ["Command", "Shift", "B"] },
  { label: "Italic", keys: ["Command", "Shift", "I"] },
  { label: "Strikethrough", keys: ["Command", "Shift", "S"] },
  { label: "Link", keys: ["Command", "Shift", "L"] },
  { label: "Ordered List", keys: ["Command", "Shift", "O"] },
  { label: "Unordered List", keys: ["Command", "Shift", "U"] },
  { label: "Code Block", keys: ["Command", "Shift", "K"] },
  { label: "Blockquote", keys: ["Command", "Shift", "Q"] },
  { label: "Heading", keys: ["Command", "Shift", "H"] },
  { label: "Table", keys: ["Command", "Shift", "T"] },
  { label: "Image", keys: ["Command", "Shift", "G"] },
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
      width={width}
      height={height}
      className="inline-block"
    />
  );
}

function ShortcutText({ keys }: { keys: string[] }) {
  return <span className="text-sm text-charcoal-dark">{keys.join(" + ")}</span>;
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
      <DialogContent
        className="
          w-full max-w-none rounded-none
          h-dvh overflow-hidden
          landscape:max-h-[90dvh]
          sm:h-auto sm:max-w-3xl sm:rounded-lg sm:max-h-none
        "
      >
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Use these shortcuts to format text quickly while editing Markdown.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col px-6 py-4 min-h-0">
          <div className="grid gap-3 sm:grid-cols-2 overflow-y-auto">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.label}
                className="
                flex flex-col gap-2
                rounded-md border border-warm-gray-light
                bg-warm-gray-light/60 px-4 py-3
                sm:flex-row sm:items-center sm:justify-between
              "
              >
                <span className="text-sm font-medium text-charcoal-dark">
                  {shortcut.label}
                </span>

                <div className="hidden sm:flex [@media(max-height:500px)]:hidden flex-wrap items-center gap-2">
                  {shortcut.keys.map((keyName, index) => (
                    <span key={index} className="flex items-center gap-2">
                      <ShortcutKey keyName={keyName} />
                      {index < shortcut.keys.length - 1 && <span>+</span>}
                    </span>
                  ))}
                </div>

                <div className="sm:hidden [@media(max-height:500px)]:block">
                  <ShortcutText keys={shortcut.keys} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
