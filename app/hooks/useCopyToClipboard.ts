import * as React from "react";

function oldSchoolCopy(text: string) {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
}

export default function useCopyToClipboard(): [
  string | null,
  (text: string) => Promise<void>,
] {
  const [value, setValue] = React.useState<string | null>(null);

  const copyToClipboard = React.useCallback(
    async (value: string): Promise<void> => {
      if (value === null) {
        return;
      }

      try {
        await navigator.clipboard.writeText(value);
      } catch (error) {
        oldSchoolCopy(value);
      } finally {
        setValue(value);
      }

      setValue(value);
    },
    [],
  );

  return [value, copyToClipboard];
}
