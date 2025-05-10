export const formatNumber = (number: number | null) => {
  if (number === null) return "";
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};
