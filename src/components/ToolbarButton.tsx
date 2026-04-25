import { ElementType } from "react";

interface ToolbarButtonProps {
  icon: ElementType;
  tooltip: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function ToolbarButton({
  icon: Icon,
  tooltip,
  disabled,
  onClick,
}: ToolbarButtonProps) {
  return (
    <div className="relative group">
      <button
        disabled={disabled}
        onClick={onClick}
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark disabled:opacity-40"
      >
        <Icon size={20} weight="bold" />
      </button>

      <div className="absolute top-full mt-0.5 left-0 hidden group-hover:block text-xs bg-charcoal text-gold px-2 py-1 rounded whitespace-nowrap">
        {tooltip}
      </div>
    </div>
  );
}
