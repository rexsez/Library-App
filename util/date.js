/*
getFormattedDate: This function takes a Date object and formats it to "YY-MM-DD"
returns a string of the formatted date
*/
export function getFotmattedDate(date) {
  let month = date.getMonth() + 1;
  return date.getFullYear() + " - " + month + " - " + date.getDate();
}
