import { useState } from "react";

export function useHistory(initialValue: string) {
  const [history, setHistory] = useState<string[]>([initialValue]);
  const [index, setIndex] = useState(0);

  const value = history[index];

  const setValue = (newValue: string) => {
    const newHistory = history.slice(0, index + 1);
    newHistory.push(newValue);

    setHistory(newHistory);
    setIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (index <= 0) return;
    setIndex(index - 1);
  };

  const redo = () => {
    if (index >= history.length - 1) return;
    setIndex(index + 1);
  };

  return {
    value,
    setValue,
    undo,
    redo,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
  };
}
