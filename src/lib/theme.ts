/**
 * Checks if the dark mode is enabled.
 *
 * @return {boolean} true if dark mode is enabled, false otherwise
 */
export const isDarkMode = () => {
  return document.documentElement.classList.contains("dark");
};
