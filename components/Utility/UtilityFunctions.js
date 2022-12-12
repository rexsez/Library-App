// Note that Descending and Ascending are actually reversed
// because the user would expect the list to start from the top of his screen
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { useState } from "react";
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
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}

export function generateRandomNumber() {
  var minm = 100000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

export function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

export function dueDateToDays(dueDate) {
  if (dueDate == "pending") return "pending";
  var days = new Date(dueDate).getTime() - new Date().getTime();
  days = Math.floor(days / (1000 * 60 * 60 * 24));
  days = days + 1;
  if (days == 0) return "book is due today!";
  if (days < 3 && days > 0)
    return days == 1 ? days + " day left!" : -1 * days + " days left!";
  else if (days >= 3) return days + " days left.";
  else
    return (
      "Book is due " +
      (days == -1 ? -1 * days + " day ago!" : -1 * days + " days ago!")
    );
}

export function dueDateSort(dueDate1, dueDate2) {
  if (dueDate1[1] == "pending" && dueDate2[1] == "pending") return 0;
  if (dueDate1[1] == "pending") return 1;
  if (dueDate2[1] == "pending") return -1;
  if (
    new Date(dueDate2[1]).getFullYear() > new Date(dueDate1[1]).getFullYear()
  ) {
    return -1;
  }
  if (
    new Date(dueDate2[1]).getFullYear() < new Date(dueDate1[1]).getFullYear()
  ) {
    return 1;
  }
  if (new Date(dueDate2[1]).getMonth() > new Date(dueDate1[1]).getMonth()) {
    return -1;
  }
  if (new Date(dueDate2[1]).getMonth() < new Date(dueDate1[1]).getMonth()) {
    return 1;
  }
  if (new Date(dueDate2[1]).getDate() > new Date(dueDate1[1]).getDate()) {
    return -1;
  }
  if (new Date(dueDate2[1]).getDate() < new Date(dueDate1[1]).getDate()) {
    return 1;
  }
  return 0;
}

export function DescendingDateRegistered(book1, book2) {
  const date = new Date();
  const date1 = new Date(book1.dateRegistered);
  const diffTime1 = Math.abs(date1 - date);
  const diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
  const date2 = new Date(book2.dateRegistered);
  const diffTime2 = Math.abs(date2 - date);
  const diffDays2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
  if (diffDays1 > diffDays2) {
    return -1;
  }
  if (diffDays1 < diffDays2) {
    return 1;
  }
  return 0;
}
// changed_
// -------------------------------------- list of fucnction ------------------------------

// changed_

// This variable will make sure to show the Aler massage only once

export function isFined(studentContext) {
  let totalFine = 0;
  if (studentContext?.student.Email && studentContext.student?.borrowedBooks) {
    const listOfBorrowedBooks = studentContext?.student.borrowedBooks;
    const keys = Object.keys(listOfBorrowedBooks);
    keys.forEach((key, index) => {
      if (isOverDue(listOfBorrowedBooks[key])) {
        let temp = numDaysFromDueDate(listOfBorrowedBooks[key]);
        totalFine = Math.round((totalFine + temp * 5) * 1.15);
      }
    });
  }

  if (totalFine != 0) {
    return true;
  }
  return false;
}
// Supporting function for checking if books are overdue
export function isOverDue(dueDate) {
  if (dueDate == "pending") return false; // added by aziz
  const dueDateObject = new Date(dueDate);
  const now = new Date();
  if (dueDateObject - now <= 0) {
    return true;
  } else {
    return false;
  }
}
export function numDaysFromDueDate(dueDate) {
  if (dueDate == "pending") return 0;
  var days = new Date(dueDate).getTime() - new Date().getTime();
  days = Math.floor(days / (1000 * 60 * 60 * 24));
  days = days + 1;
  return days;
}

