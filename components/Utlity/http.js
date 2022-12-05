import { async } from "@firebase/util";
import axios from "axios";

import Announcement from "../../models/Announcement";
import Book from "../../models/Book";
import Student from "../../models/Student";
import { toFixed } from "./UtilityFunctions";

const database =
  "https://psu-library-app-default-rtdb.europe-west1.firebasedatabase.app/";

// ------------------------------------------Books Stuff----------------------------------------------------
// getting books from the database
export async function fetchBooks() {
  const response = await axios.get(database + "books.json");
  let databaseBooks = [];
  for (const key in response.data) {
    const bookData = response.data[key];
    let id = key;
    let author = bookData.author;
    let category = bookData.category;
    let date = new Date(bookData.date);
    // if a book doesn't have a rating it will be -1 by default, otherwise it will compute its average rating
    let rating = -1;
    // !!bookData.ratings is basically asking does a rating exist?
    if (!!bookData.ratings) {
      let ratings = [];
      let sum = 0.0;
      for (const rate in bookData.ratings) {
        const currentRating = bookData.ratings[rate];
        // rates are stored as string in database for accuracy purposes, so here we are converting it
        // to float
        currentRating = parseFloat(currentRating);
        ratings.push(currentRating);
        sum += currentRating;
      }
      // getting average
      rating = sum / ratings.length;
      // toFixed take two arguments, the first one being the number, and the second one being the
      // number of the desired decimal points without any rounding
      // Note: toFixed is implemented locally not the one implemented by javascript itself; because that
      // one rounds answers automatically
      rating = toFixed(rating, 2);
    }
    let isbn = bookData.isbn;
    let summary = bookData.summary;
    let title = bookData.title;
    // getting image path from firebase, check getImage for details
    let img = await getImage(bookData.image);
    databaseBooks.push(
      new Book(
        id,
        isbn,
        title,
        img,
        author,
        date,
        category,
        summary,
        rating,
        false,
        null
      )
    );
  }
  return databaseBooks;
}
// get book categories from the database
export async function fetchCategories() {
  const response = await axios.get(database + "categories.json");
  let databaseCategories = [];
  for (const key in response.data) {
    let category = response.data[key].category;
    // console.log(category);
    /* 
    This format is is required by the dropdown component that we are using, label indicates what will show 
    on the screen (user interface), and value is what value will be taken in the backend 
    */
    databaseCategories.push({ label: category, value: category });
  }
  return databaseCategories;
}
/*
You basically provide this function with the image name and it will get it download url (view url) from the
the storage of the database, the naming of the image must follow the rules that Faisal set(xy.jpg) where x is
the ISBN of the book and y is the name of the image before uploading it from Faisal's PC
 */
export async function getImage(imageName) {
  var finalUrl =
    "https://firebasestorage.googleapis.com/v0/b/psu-library-app.appspot.com/o/images%2F" +
    imageName +
    "?alt=media&token=";

  const respone = await axios.get(finalUrl);
  const header = respone.headers.get(
    "x-goog-meta-firebasestoragedownloadtokens"
  );
  const final = finalUrl + header;
  return final;
}
/* 
IsItRated is boolean to check if the book is rated or not (Create new rating object or no)
update is boolean to check if the student is updating their existing rating or no
rating is the new rating which will be treated as a string for rating accuracy, otherwise firebase
will round it automatically      
*/
export async function postRating(studentID, bookID, isItRated, update, rating) {
  // if book has at least one rating, it will go inside this condition
  if (isItRated) {
    // if the student is updating their existing rating, it will go inside this condition
    if (update) {
    }
    // if the student is adding their rating to the book, it will go inside this condition
    else {
    }
  }
  // if the book has no rating yet, it will go inside this condition
  else {
  }
  const response = await axios.get(database + "categories.json");
  let databaseCategories = [];
  for (const key in response.data) {
    let category = response.data[key].category;
    // console.log(category);
    databaseCategories.push({ label: category, value: category });
  }
  return databaseCategories;
}
// ------------------------------------------Announcement----------------------------------------------------
export async function fetchAnnouncements() {
  // basically await waits for the promise to happen. ---> returns a promise ....
  const response = await axios.get(database + "announcements.json");
  //.get returns the students object, which we will turn into an array.
  // this object has key generated by firebase as the key, and individual students objects
  // as values associated with the key.
  let announcements;
  for (const key in response.data) {
    const announcementsData = response.data[key];
    const announcement = new Announcement(
      announcementsData.everyone,
      announcementsData.staff,
      announcementsData.students
    );
    announcements = announcement;
  }
  return announcements;
}
// --------------------------------------------Student-------------------------------------------------------
// this method can be used to add new student object to students object
// each new student object has a unique key generated by default by firebase
export function registerStudent(studentInfo) {
  axios.post(database + "students.json", studentInfo);
}
//this method can be used to get students object,
// then make that students object into an array to be used somewhere else.

// note axios.get is asynchronous --> so it returns promisees:
// promises are objects that give access to some data later in future.
export async function getStudents() {
  // basically await waits for the promise to happen. ---> returns a promise ....
  const response = await axios.get(database + "students.json");
  //.get returns the students object, which we will turn into an array.
  // this object has key generated by firebase as the key, and individual students objects
  // as values associated with the key.
  let students = [];
  for (const key in response.data) {
    const studentData = response.data[key];
    const student = new Student(
      studentData.FName,
      studentData.LName,
      studentData.Email,
      studentData.psw,
      studentData.borrowedBooks,
      studentData.favBooks
    );
    students.push(student);
  }
  return students;
}
export async function getStudentID(email) {
  // basically await waits for the promise to happen. ---> returns a promise ....
  const response = await axios.get(database + "students.json");
  //.get returns the students object, which we will turn into an array.
  // this object has key generated by firebase as the key, and individual students objects
  // as values associated with the key.
  let studentID = null;
  for (const key in response.data) {
    const studentData = response.data[key];
    if (studentData.Email === email) {
      studentID = key;
    }
  }
  return studentID;
}
