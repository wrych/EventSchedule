export interface TextDiff {
  start: number;
  removed: string;
  inserted: string;
}

export const computeTextDiff = (oldText: string, newText: string): TextDiff => {
  let start = 0;
  while (start < oldText.length && start < newText.length && oldText[start] === newText[start]) {
    start++;
  }
  let endOld = oldText.length;
  let endNew = newText.length;
  while (endOld > start && endNew > start && oldText[endOld - 1] === newText[endNew - 1]) {
    endOld--;
    endNew--;
  }
  const removed = oldText.slice(start, endOld);
  const inserted = newText.slice(start, endNew);
  return { start, removed, inserted };
};

export const applyTextDiff = (text: string, diff: TextDiff): string => {
  return text.slice(0, diff.start) + diff.inserted + text.slice(diff.start + diff.removed.length);
};
