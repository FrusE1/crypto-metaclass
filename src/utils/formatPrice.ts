const formatPrice = (number: number): string => {
  return new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(
    number
  );
};

export default formatPrice;
