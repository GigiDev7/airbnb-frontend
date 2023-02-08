import { MouseEvent, useState, useEffect } from "react";

export const useToggleWindow = (setDocumentListener = false) => {
  const [isWindowShown, setIsWindowShown] = useState(false);

  useEffect(() => {
    return () => {
      if (setDocumentListener) {
        document.removeEventListener("click", hideWindow);
      }
    };
  }, []);

  const showWindow = (e: MouseEvent) => {
    if (setDocumentListener) {
      e.stopPropagation();
      document.addEventListener("click", hideWindow);
    }
    setIsWindowShown(true);
  };

  const hideWindow = () => {
    setIsWindowShown(false);
  };

  const toggleWindow = () => {
    setIsWindowShown((prev) => !prev);
  };

  return { isWindowShown, showWindow, hideWindow, toggleWindow };
};
