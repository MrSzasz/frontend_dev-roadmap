/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} string - The input string to be capitalized
 * @return {string} The capitalized string
 */
export const capitalizeFirst = (string: string): string => {
  const capitalized = string.charAt(0).toUpperCase() + string.slice(1);

  return capitalized;
};

/**
 * Formats a given timestamp into a date string.
 *
 * @param {Date | string} timestamp - The timestamp to be formatted.
 * @return {string} The formatted date string.
 */
export const dateFormatter = (timestamp: Date | string): string => {
  const formattedData = new Intl.DateTimeFormat().format(Number(timestamp));
  return formattedData;
};
