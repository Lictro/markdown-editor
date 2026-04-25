import type { RefObject } from "react";

export function getMetrics(text: string, textarea?: HTMLTextAreaElement) {
  const bytes = new TextEncoder().encode(text).length;

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const lines = text.split("\n").length;

  let currentLine = 1;
  let currentCol = 0;

  if (textarea) {
    const cursorPos = textarea.selectionStart;

    const textUntilCursor = text.slice(0, cursorPos);
    const split = textUntilCursor.split("\n");

    currentLine = split.length;
    currentCol = split[split.length - 1].length;
  }

  return {
    bytes,
    words,
    lines,
    currentLine,
    currentCol,
  };
}

export function getPreviewMetrics(text: string) {
  const characters = text.length;

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length;

  return {
    characters,
    words,
    paragraphs,
  };
}

export function updateValueAndSelection(
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

export function transformSelection(
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

export function prefixSelectionLines(
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

export function insertTable(
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

export function insertLink(
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

export function insertImage(
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

export function insertHeading(
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

export function insertCode(
  value: string,
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  setValue: (value: string) => void,
) {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const { selectionStart, selectionEnd } = textarea;
  const selectedText = value.slice(selectionStart, selectionEnd);

  if (!selectedText) {
    transformSelection(value, textareaRef, setValue, "```\n", "\n```", "code");
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

  transformSelection(value, textareaRef, setValue, "```\n", "\n```");
}
