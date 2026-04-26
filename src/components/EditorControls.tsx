import {
  ArrowArcLeftIcon,
  ArrowArcRightIcon,
  CodeIcon,
  ImageIcon,
  LinkSimpleIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  QuestionIcon,
  QuotesIcon,
  TableIcon,
  TextBIcon,
  TextHIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  type IconWeight,
} from "@phosphor-icons/react";
import { useEffect, type RefObject } from "react";
import ToolbarButton from "./ToolbarButton";
import {
  transformSelection,
  prefixSelectionLines,
  insertTable,
  insertLink,
  insertImage,
  insertHeading,
  insertCode,
} from "@/utils/EditorUtils";

interface EditorControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  value: string;
  setValue: (value: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  openModal: () => void;
}

type ButtonConfig = {
  icon: React.ComponentType<{ size?: number; weight?: IconWeight }>;
  action: (
    value: string,
    setValue: (value: string) => void,
    textareaRef: RefObject<HTMLTextAreaElement | null>,
  ) => void;
  tooltip: string;
  disabled?: boolean;
};

export default function EditorControls({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  value,
  setValue,
  textareaRef,
  openModal,
}: EditorControlsProps) {
  const buttonConfigs: ButtonConfig[] = [
    {
      icon: TextBIcon,
      action: (value, setValue, textareaRef) =>
        transformSelection(value, textareaRef, setValue, "**", "**", "text"),
      tooltip: "Bold",
    },
    {
      icon: TextItalicIcon,
      action: (value, setValue, textareaRef) =>
        transformSelection(value, textareaRef, setValue, "*", "*", "text"),
      tooltip: "Italic",
    },
    {
      icon: TextHIcon,
      action: (value, setValue, textareaRef) =>
        insertHeading(value, textareaRef, setValue, 2),
      tooltip: "Heading",
    },
    {
      icon: TextStrikethroughIcon,
      action: (value, setValue, textareaRef) =>
        transformSelection(value, textareaRef, setValue, "~~", "~~", "text"),
      tooltip: "Strikethrough",
    },
    {
      icon: ListBulletsIcon,
      action: (value, setValue, textareaRef) =>
        prefixSelectionLines(value, textareaRef, setValue, "- ", "item"),
      tooltip: "Bullet List",
    },
    {
      icon: ListNumbersIcon,
      action: (value, setValue, textareaRef) =>
        prefixSelectionLines(value, textareaRef, setValue, "1. ", "item", true),
      tooltip: "Numbered List",
    },
    {
      icon: QuotesIcon,
      action: (value, setValue, textareaRef) =>
        prefixSelectionLines(value, textareaRef, setValue, "> ", "text"),
      tooltip: "Blockquote",
    },
    {
      icon: CodeIcon,
      action: (value, setValue, textareaRef) =>
        insertCode(value, textareaRef, setValue),
      tooltip: "Code",
    },
    {
      icon: TableIcon,
      action: (value, setValue, textareaRef) =>
        insertTable(value, textareaRef, setValue),
      tooltip: "Table",
    },
    {
      icon: LinkSimpleIcon,
      action: (value, setValue, textareaRef) =>
        insertLink(value, textareaRef, setValue),
      tooltip: "Link",
    },
    {
      icon: ImageIcon,
      action: (value, setValue, textareaRef) =>
        insertImage(value, textareaRef, setValue),
      tooltip: "Image",
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement !== textareaRef.current) return;
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const cmd = isMac ? e.metaKey : e.ctrlKey;

      if (!cmd || !e.shiftKey) return;

      const key = e.key.toLowerCase();

      e.preventDefault();

      switch (key) {
        case "b":
          transformSelection(value, textareaRef, setValue, "**", "**", "text");
          break;
        case "i":
          transformSelection(value, textareaRef, setValue, "*", "*", "text");
          break;
        case "s":
          transformSelection(value, textareaRef, setValue, "~~", "~~", "text");
          break;
        case "l":
          insertLink(value, textareaRef, setValue);
          break;
        case "o":
          prefixSelectionLines(
            value,
            textareaRef,
            setValue,
            "1. ",
            "item",
            true,
          );
          break;
        case "u":
          prefixSelectionLines(value, textareaRef, setValue, "- ", "item");
          break;
        case "k":
          insertCode(value, textareaRef, setValue);
          break;
        case "q":
          prefixSelectionLines(value, textareaRef, setValue, "> ", "text");
          break;
        case "h":
          insertHeading(value, textareaRef, setValue, 2);
          break;
        case "t":
          insertTable(value, textareaRef, setValue);
          break;
        case "g":
          insertImage(value, textareaRef, setValue);
          break;
        default:
          return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [value, setValue, textareaRef]);

  return (
    <div className="flex flex-wrap items-center gap-2 bg-gold px-6 pb-3">
      <ToolbarButton
        icon={ArrowArcLeftIcon}
        tooltip="Undo"
        disabled={!canUndo}
        onClick={onUndo}
      />
      <ToolbarButton
        icon={ArrowArcRightIcon}
        tooltip="Redo"
        disabled={!canRedo}
        onClick={onRedo}
      />
      {buttonConfigs.map((config, index) => {
        return (
          <ToolbarButton
            key={index}
            icon={config.icon}
            tooltip={config.tooltip}
            disabled={config.disabled}
            onClick={() => config.action(value, setValue, textareaRef)}
          />
        );
      })}
      <button
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded disabled:opacity-40 text-charcoal-dark"
        onClick={openModal}
      >
        <QuestionIcon size={20} weight="bold" />
      </button>
    </div>
  );
}
