// Note that Descending and Ascending are actually reversed
// because the user would expect the list to start from the top of his screen
export function DescendingTitle(book1, book2) {
  if (book1.title.toLowerCase() > book2.title.toLowerCase()) {
    return -1;
  }
  if (book1.title.toLowerCase() < book2.title.toLowerCase()) {
    return 1;
  }
  return 0;
}
export function AscendingTitle(book1, book2) {
  if (book2.title.toLowerCase() > book1.title.toLowerCase()) {
    return -1;
  }
  if (book2.title.toLowerCase() < book1.title.toLowerCase()) {
    return 1;
  }
  return 0;
}
export function DescendingAuthor(book1, book2) {
  if (book1.author.toLowerCase() > book2.author.toLowerCase()) {
    return -1;
  }
  if (book1.author.toLowerCase() < book2.author.toLowerCase()) {
    return 1;
  }
  return 0;
}
export function AscendingAuthor(book1, book2) {
  if (book2.author.toLowerCase() > book1.author.toLowerCase()) {
    return -1;
  }
  if (book2.author.toLowerCase() < book1.author.toLowerCase()) {
    return 1;
  }
  return 0;
}
export function DescendingDate(book1, book2) {
  if (book1.date.getFullYear() > book2.date.getFullYear()) {
    return -1;
  }
  if (book1.date.getFullYear() < book2.date.getFullYear()) {
    return 1;
  }
  if (book1.date.getMonth() > book2.date.getMonth()) {
    return -1;
  }
  if (book1.date.getMonth() < book2.date.getMonth()) {
    return 1;
  }
  if (book1.date.getDate() > book2.date.getDate()) {
    return -1;
  }
  if (book1.date.getDate() < book2.date.getDate()) {
    return 1;
  }
  return 0;
}
export function AscendingDate(book1, book2) {
  if (book2.date.getFullYear() > book1.date.getFullYear()) {
    return -1;
  }
  if (book2.date.getFullYear() < book1.date.getFullYear()) {
    return 1;
  }
  if (book2.date.getMonth() > book1.date.getMonth()) {
    return -1;
  }
  if (book2.date.getMonth() < book1.date.getMonth()) {
    return 1;
  }
  if (book2.date.getDate() > book1.date.getDate()) {
    return -1;
  }
  if (book2.date.getDate() < book1.date.getDate()) {
    return 1;
  }
  return 0;
}
export function DescendingRating(book1, book2) {
  if (book1.rating > book2.rating) {
    return -1;
  }
  if (book1.rating < book2.rating) {
    return 1;
  }
  return 0;
}

export function AscendingRating(book1, book2) {
  if (book2.rating > book1.rating) {
    return -1;
  }
  if (book2.rating < book1.rating) {
    return 1;
  }
  return 0;
}

export function DescendingTimesBorrowed(book1, book2) {
  if (book1.timesBorrowed > book2.timesBorrowed) {
    return -1;
  }
  if (book1.timesBorrowed < book2.timesBorrowed) {
    return 1;
  }
  return 0;
}

export function toFixed(num, fixed) {
  var re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(re)[0];
}

export function formateDate(date) {
  return (
    date.getFullYear() + " - " + (date.getMonth() + 1) + " - " + date.getDate()
  );
}
