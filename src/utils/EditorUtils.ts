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
