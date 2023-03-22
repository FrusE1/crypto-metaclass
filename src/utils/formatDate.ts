/** Преобразование миллисекунд в формат [часы:минуты] */
export const formatTime = (miliseconds: number): string => {
  const date: Date = new Date(miliseconds);
  let hours: string = String(date.getHours());
  let minutes: string = String(date.getMinutes());
  if (date.getHours() <= 9) {
    hours = "0" + hours;
  }
  if (date.getMinutes() <= 9) {
    minutes = "0" + minutes;
  }
  return `${hours}:${minutes}`;
};

export const formatDate = (miliseconds: number): string => {
  const date: Date = new Date(miliseconds);
  let month: string = String(date.getMonth() + 1);
  if (date.getMonth() + 1 <= 9) {
    month = "0" + month;
  }
  return `${date.getFullYear()}.${month}.${date.getDate()} ${formatTime(
    miliseconds
  )}`;
};
