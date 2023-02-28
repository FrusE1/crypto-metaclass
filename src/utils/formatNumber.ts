const formatNumber = (number: number, options: object = {}): string => {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
    ...options,
  }).format(number);
};

export default formatNumber;
