const convertNumberToArray = (number: number): number[] => {
  const array: number[] = [];
  for (let i = 1; i <= number; i++) {
    array.push(i);
  }
  return array;
};

export default convertNumberToArray;
