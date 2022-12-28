export const capitalizeFirstLetterInWords = str =>
  str
    ? str
        .split(' ')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')
    : str;
