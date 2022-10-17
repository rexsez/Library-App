/*
getFormattedDate: This function takes a Date object and formats it to "YY-MM-DD"
returns a string of the formatted date
*/
export function getFotmattedDate(date) {
  return date.getFullYear() + ' - ' + date.getMonth() + ' - ' + date.getDay();
}
