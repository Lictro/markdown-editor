import { useCallback } from "react";

export function useScrollSync(
  editorRef: React.RefObject<HTMLTextAreaElement | null>,
  previewRef: React.RefObject<HTMLDivElement | null>,
) {
  const syncScroll = useCallback(
    (source: "editor" | "preview") => {
      const editor = editorRef.current;
      const preview = previewRef.current;

      if (!editor || !preview) return;

      let ratio = 0;

      if (source === "editor") {
        ratio =
          editor.scrollTop / (editor.scrollHeight - editor.clientHeight || 1);

        preview.scrollTop =
          ratio * (preview.scrollHeight - preview.clientHeight);
      } else {
        ratio =
          preview.scrollTop /
          (preview.scrollHeight - preview.clientHeight || 1);

        editor.scrollTop = ratio * (editor.scrollHeight - editor.clientHeight);
      }
    },
    [editorRef, previewRef],
  );

  return { syncScroll };
}
