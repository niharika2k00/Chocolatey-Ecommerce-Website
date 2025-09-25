import API_URL from "./config.js";

// Generate full image url from filename
export const getImageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image; // already a full URL

  return `${API_URL}/${image}`; // construct from filename
};
