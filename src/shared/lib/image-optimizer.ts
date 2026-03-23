/**
 * Utility to optimize Unsplash and other image URLs
 */
export const optimizeUrl = (url: string | undefined, width = 800, quality = 80) => {
  if (!url) return "";
  
  if (url.includes("unsplash.com")) {
    const baseUrl = url.split("?")[0];
    // auto=format ensures WebP/AVIF where supported
    // fit=crop ensures consistent aspect ratio
    return `${baseUrl}?auto=format&fit=crop&w=${width}&q=${quality}`;
  }
  
  // For other URLs, we can still append params if the service supports it, 
  // but for now we just return as is if not Unsplash.
  return url;
};

/**
 * Common breakpoints for optimization
 */
export const Breakpoints = {
  Thumbnail: 400,
  Card: 600,
  Section: 1200,
  Hero: 1920,
};
