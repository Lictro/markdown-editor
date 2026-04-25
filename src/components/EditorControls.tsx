import {
  ArrowArcLeftIcon,
  ArrowArcRightIcon,
  CodeIcon,
  ImageIcon,
  LinkSimpleIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  QuotesIcon,
  TableIcon,
  TextBIcon,
  TextHIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
} from "@phosphor-icons/react";
import type { RefObject } from "react";

interface EditorControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  value: string;
  setValue: (value: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  viewMode: "editor" | "preview";
  setViewMode: (mode: "editor" | "preview") => void;
}

function updateValueAndSelection(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  setValue: (value: string) => void,
  newValue: string,
  selectionStart: number,
  selectionEnd: number,
) {
  setValue(newValue);

  const textarea = textareaRef.current;
  if (!textarea) return;

  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(selectionStart, selectionEnd);
  });
}

function transformSelection(
  value: string,
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  setValue: (value: string) => void,
  before: string,
  after: string,
  placeholder = "text",
) {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const { selectionStart, selectionEnd } = textarea;
  const selectedText = value.slice(selectionStart, selectionEnd);
  const content = selectedText || placeholder;
  const replacement = `${before}${content}${after}`;
  const newValue =
    value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);

  const newSelectionStart = selectedText
    ? selectionStart
    : selectionStart + before.length;
  const newSelectionEnd = selectedText
    ? selectionStart + replacement.length
    : selectionStart + before.length + placeholder.length;

  updateValueAndSelection(
    textareaRef,
    setValue,
    newValue,
    newSelectionStart,
    newSelectionEnd,
  );
}

function prefixSelectionLines(
  value: string,
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  setValue: (value: string) => void,
  prefix: string,
  placeholder = "text",
  ordered = false,
) {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const { selectionStart, selectionEnd } = textarea;
  const selectedText = value.slice(selectionStart, selectionEnd);

  if (!selectedText) {
    const replacement = ordered
      ? `1. ${placeholder}`
      : `${prefix}${placeholder}`;
    const newValue =
      value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);
    const newSelectionStart = selectionStart + prefix.length;
    const newSelectionEnd = newSelectionStart + placeholder.length;
    updateValueAndSelection(
      textareaRef,
      setValue,
      newValue,
      newSelectionStart,
      newSelectionEnd,
    );
    return;
  }

  const lines = selectedText.split("\n");
  const transformed = lines
    .map((line, index) => {
      if (ordered) {
        return `${index + 1}. ${line || placeholder}`;
      }
      return `${prefix}${line || placeholder}`;
    })
    .join("\n");

  const newValue =
    value.slice(0, selectionStart) + transformed + value.slice(selectionEnd);
  const newSelectionStart = selectionStart;
  const newSelectionEnd = selectionStart + transformed.length;
  updateValueAndSelection(
    textareaRef,
    setValue,
    newValue,
    newSelectionStart,
    newSelectionEnd,
  );
}

function insertTable(
  value: string,
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  setValue: (value: string) => void,
) {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const { selectionStart, selectionEnd } = textarea;
  const tableMarkdown =
    "| Header | Header |\n| ------ | ------ |\n| Cell   | Cell   |";
  const newValue =
    value.slice(0, selectionStart) + tableMarkdown + value.slice(selectionEnd);
  const headerStart = selectionStart + 2;
  const headerEnd = headerStart + 6; // selects first Header

  updateValueAndSelection(
    textareaRef,
    setValue,
    newValue,
    headerStart,
    headerEnd,
  );
}

function insertLink(
  value: string,
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  setValue: (value: string) => void,
) {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const { selectionStart, selectionEnd } = textarea;
  const selectedText = value.slice(selectionStart, selectionEnd);
  const linkText = selectedText || "text";
  const replacement = `[${linkText}](url)`;
  const newValue =
    value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);

  const urlStart = selectionStart + replacement.indexOf("url");
  const urlEnd = urlStart + 3;
  const textStart = selectionStart + 1;
  const textEnd = textStart + linkText.length;

  updateValueAndSelection(
    textareaRef,
    setValue,
    newValue,
    selectedText ? urlStart : textStart,
    selectedText ? urlEnd : textEnd,
  );
}

function insertImage(
  value: string,
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  setValue: (value: string) => void,
) {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const { selectionStart, selectionEnd } = textarea;
  const selectedText = value.slice(selectionStart, selectionEnd);
  const altText = selectedText || "alt";
  const replacement = `![${altText}](url)`;
  const newValue =
    value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);

  const urlStart = selectionStart + replacement.indexOf("url");
  const urlEnd = urlStart + 3;
  const altStart = selectionStart + 2;
  const altEnd = altStart + altText.length;

  updateValueAndSelection(
    textareaRef,
    setValue,
    newValue,
    selectedText ? urlStart : altStart,
    selectedText ? urlEnd : altEnd,
  );
}

function insertHeading(
  value: string,
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  setValue: (value: string) => void,
  level = 2,
) {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const prefix = "#".repeat(level) + " ";
  const { selectionStart, selectionEnd } = textarea;
  const selectedText = value.slice(selectionStart, selectionEnd);

  if (!selectedText) {
    const replacement = `${prefix}text`;
    const newValue =
      value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);
    const selectionStartInner = selectionStart + prefix.length;
    const selectionEndInner = selectionStartInner + 4;
    updateValueAndSelection(
      textareaRef,
      setValue,
      newValue,
      selectionStartInner,
      selectionEndInner,
    );
    return;
  }

  const beforeSelection = value.slice(0, selectionStart);
  const afterSelection = value.slice(selectionEnd);
  const newValue = beforeSelection + prefix + selectedText + afterSelection;
  const newSelectionStart = selectionStart;
  const newSelectionEnd = selectionStart + prefix.length + selectedText.length;
  updateValueAndSelection(
    textareaRef,
    setValue,
    newValue,
    newSelectionStart,
    newSelectionEnd,
  );
}

function insertCode(
  value: string,
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  setValue: (value: string) => void,
) {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const { selectionStart, selectionEnd } = textarea;
  const selectedText = value.slice(selectionStart, selectionEnd);

  if (!selectedText) {
    transformSelection(value, textareaRef, setValue, "`", "`", "code");
    return;
  }

  const isMultiline = selectedText.includes("\n");
  if (isMultiline) {
    const replacement = `\`\`\`\n${selectedText}\n\`\`\``;
    const newValue =
      value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);
    const newSelectionStart = selectionStart;
    const newSelectionEnd = selectionStart + replacement.length;
    updateValueAndSelection(
      textareaRef,
      setValue,
      newValue,
      newSelectionStart,
      newSelectionEnd,
    );
    return;
  }

  transformSelection(value, textareaRef, setValue, "`", "`");
}

export default function EditorControls({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  value,
  setValue,
  textareaRef,
  viewMode,
  setViewMode,
}: EditorControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 bg-gold px-6 pb-3">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded disabled:opacity-40 text-charcoal-dark"
      >
        <ArrowArcLeftIcon size={20} weight="bold" />
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded disabled:opacity-40 text-charcoal-dark"
      >
        <ArrowArcRightIcon size={20} weight="bold" />
      </button>
      <button
        onClick={() =>
          transformSelection(value, textareaRef, setValue, "**", "**", "text")
        }
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark"
      >
        <TextBIcon size={20} weight="bold" />
      </button>
      <button
        onClick={() =>
          transformSelection(value, textareaRef, setValue, "*", "*", "text")
        }
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark"
      >
        <TextItalicIcon size={20} weight="bold" />
      </button>
      <button
        onClick={() => insertHeading(value, textareaRef, setValue, 2)}
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark"
      >
        <TextHIcon size={20} weight="bold" />
      </button>
      <button
        onClick={() =>
          transformSelection(value, textareaRef, setValue, "~~", "~~", "text")
        }
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark"
      >
        <TextStrikethroughIcon size={20} weight="bold" />
      </button>
      <button
        onClick={() =>
          prefixSelectionLines(value, textareaRef, setValue, "- ", "item")
        }
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark"
      >
        <ListBulletsIcon size={20} weight="bold" />
      </button>
      <button
        onClick={() =>
          prefixSelectionLines(
            value,
            textareaRef,
            setValue,
            "1. ",
            "item",
            true,
          )
        }
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark"
      >
        <ListNumbersIcon size={20} weight="bold" />
      </button>
      <button
        onClick={() =>
          prefixSelectionLines(value, textareaRef, setValue, "> ", "text")
        }
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark"
      >
        <QuotesIcon size={20} weight="bold" />
      </button>
      <button
        onClick={() => insertCode(value, textareaRef, setValue)}
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark"
      >
        <CodeIcon size={20} weight="bold" />
      </button>
      <button
        onClick={() => insertTable(value, textareaRef, setValue)}
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark"
      >
        <TableIcon size={20} weight="bold" />
      </button>
      <button
        onClick={() => insertLink(value, textareaRef, setValue)}
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark"
      >
        <LinkSimpleIcon size={20} weight="bold" />
      </button>
      <button
        onClick={() => insertImage(value, textareaRef, setValue)}
        type="button"
        className="p-2 hover:bg-charcoal-dark hover:text-gold rounded text-charcoal-dark"
      >
        <ImageIcon size={20} weight="bold" />
      </button>
    </div>
  );
}
