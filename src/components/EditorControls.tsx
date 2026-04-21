import { ArrowArcLeftIcon, ArrowArcRightIcon } from "@phosphor-icons/react";

interface EditorControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function EditorControls({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: EditorControlsProps) {
  return (
    <div className="flex items-center gap-2 bg-gold px-6 pb-3">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded disabled:opacity-40 text-charcoal-dark"
      >
        <ArrowArcLeftIcon size={20} weight="bold" />
      </button>

      <button
        onClick={onRedo}
        disabled={!canRedo}
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded disabled:opacity-40 text-charcoal-dark"
      >
        <ArrowArcRightIcon size={20} weight="bold" />
      </button>
    </div>
  );
}
