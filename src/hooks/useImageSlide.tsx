import { useState } from "react";

export const useImageSlide = (images: string[]) => {
  const [imageIndex, setImageIndex] = useState(0);

  const changeImageIndex = (type: "prev" | "next") => {
    if (type === "prev") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex((prev) => (prev -= 1));
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex((prev) => (prev += 1));
      }
    }
  };

  return { imageIndex, changeImageIndex };
};
