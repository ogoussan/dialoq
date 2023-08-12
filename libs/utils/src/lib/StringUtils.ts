export const ToUpperCase = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const CamelCaseToTitleCase = (text: string): string => {
  const result = text.replace(/([A-Z])/g, ' $1');

  return ToUpperCase(result);
};
