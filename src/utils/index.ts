export const formatNumber = (number: number) => {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};
