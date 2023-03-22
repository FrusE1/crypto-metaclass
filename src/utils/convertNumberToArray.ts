/** Конвертирование цифры в массив с длиной равной цифре */
const convertNumberToArray = (number: number): number[] => {
  const array: number[] = [];
  for (let i = 1; i <= Math.ceil(number); i++) {
    array.push(i);
  }
  return array;
};

export default convertNumberToArray;
