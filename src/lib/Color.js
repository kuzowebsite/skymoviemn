"use client";
import ColorThief from "colorthief";

export const getDominantColor = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      try {
        const dominantColor = colorThief.getColor(img); // Returns the dominant color in RGB
        resolve(dominantColor); // Directly return RGB
      } catch (error) {
        reject("Failed to extract dominant color");
      }
    };

    img.onerror = () => reject("Image failed to load");
  });
};
 