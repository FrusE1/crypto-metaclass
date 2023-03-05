const formatNumber = (
  number: number,
  { maximumFractionDigits = 2, ...rest }: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits,
    ...rest,
  }).format(number);
};

export default formatNumber;
