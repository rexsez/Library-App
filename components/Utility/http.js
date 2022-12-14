import axios from "axios";
import Student from "../../models/Student";
import Announcement from "../../models/Announcement";
import Book from "../../models/Book";
import {
  generateRandomNumber,
  toFixed,
  DescendingRating,
  DescendingTimesBorrowed,
  DescendingDateRegistered,
} from "./UtilityFunctions";
import { AppContext } from "../../store/AppContext";
import { useContext } from "react";
import { sendMail } from "../../Server/mailUtility";
import { updatedListOfBorrowedBooks } from "./UtilityFunctions";

const database =
  "https://psu-library-app-default-rtdb.europe-west1.firebasedatabase.app/";
// ----------------------------------------- Edit profile stuff -------------------------------------------

export async function updateProfile(ID, student) {
  axios.put(database + `students/${ID}.json`, student);
}
// Hisham start
function assignBadges(books) {
  books.sort(DescendingRating);
  for (i = 0; i < books.length; i++) {
    if (books[i].rating >= 4.75)
      books[i].badge.push(["fire", "red", 0, "yellow", "grey"]);
    else break;
  }
  books.sort(DescendingTimesBorrowed);
  var timesBorrowedMax = 5;
  if (books.length >= 5) {
    if (books[4].timesBorrowed > 5) timesBorrowedMax = books[4].timesBorrowed;
  } else {
    if (books[books.length - 1].timesBorrowed > 5)
      timesBorrowedMax = books[books.length - 1].timesBorrowed;
  }
  for (i = 0; i < books.length; i++) {
    if (books[i].timesBorrowed >= timesBorrowedMax)
      books[i].badge.push(["podium-gold", "purple", 0, "lightblue", "grey"]);
    else break;
  }
  books.sort(DescendingDateRegistered);
  console.log(books);
  for (i = 0; i < books.length; i++) {
    let date1 = new Date();
    let date2 = new Date(books[i].dateRegistered);
    let diffTime = Math.abs(date1 - date2);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 7)
      books[i].badge.push(["new-box", "lightgreen", 3, "#1c1c1c", "lightgrey"]);
  }
  return books;
}
// Hisham end
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
    let timesBorrowed = bookData.timesBorrowed;
    let date;
    if (bookData.date) {
      date = new Date(bookData.date);
    } else {
      date = new Date();
    }
    // if a book doesn't have a rating it will be -1 by default, otherwise it will compute its average rating
    let rating = -1;
    let ratedBy = [];
    // !!bookData.ratings is basically asking does a rating exist?
    if (!!bookData.ratings) {
      let ratings = [];
      let sum = 0.0;
      for (const rate in bookData.ratings) {
        const currentRating = bookData.ratings[rate];
        ratedBy.push({ key: rate, rating: currentRating });
        // rates are stored as string in database for accuracy purposes, so here we are converting it
        // to float
        currentRating = parseFloat(currentRating);
        if (currentRating != -1) {
          ratings.push(currentRating);
          sum += currentRating;
        }
      }
      // getting average
      if (ratings.length != 0) rating = sum / ratings.length;
      else rating = -1;
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
    let img;
    // changed_
    if (bookData.image !== "") {
      img = await getImage(bookData.image);
    } else {
      img =
        "https://firebasestorage.googleapis.com/v0/b/psu-library-app.appspot.com/o/images%2Fno_book.png?alt=media&token=4ddb2db7-9924-4f52-9041-11e0d6cf5c63";
    }

    let badge = [];
    // Hisham start
    let dateRegistered = bookData.dateRegistered;
    // Hisham end

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
        badge,
        ratedBy,
        timesBorrowed,
        // Hisham start
        dateRegistered
        // Hisham end
      )
    );
  }
  return assignBadges(databaseBooks);
}
// get book categories from the database
export async function fetchCategories() {
  const response = await axios.get(database + "categories.json");
  let databaseCategories = [];
  for (const key in response.data) {
    let category = response.data[key].category;
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
// if a student does have a rating it will be edited, otherwise a new rating will be added

export async function postRating(studentID, bookID, rating) {
  const link = database + "books/" + bookID + "/ratings.json";

  // var sendData = {};
  // sendData[studentID] = rating;
  // var data=studentID+":"+rating

  // axios.post(link, { [studentID]: rating });
  const result = await axios.get(link);
  let res = result.data;
  res[studentID] = rating;
  axios.put(link, res);
}
// Hisahm start
export async function deleteRating(studentID, bookID) {
  const link = database + "books/" + bookID + "/ratings.json";
  const result = await axios.get(link);
  let res = result.data;
  delete res[studentID];
  axios.put(link, res);
}

// Hisham close
// ------------------------------------------get books----------------------------------------------------
export async function getBooks() {
  const appCtx = useContext(AppContext);

  const books = await fetchBooks();
  const categories = await fetchCategories();
  appCtx.changeBooks(books);
  appCtx.changeCategories(categories);
}

// ------------------------------------------Book Request----------------------------------------------------
//Send book request info to database -> so admin can view it from the admin panel
export async function requestBook(requestData) {
  axios.post(database + "book_requests.json", requestData);
}
//uploading the requested book's image
// export async function uploadImage(imgUri) {
//   // await "psu-library-app.appspot.com".ref().child(filename).put(blob);
//   // const storage = "psu-library-app.appspot.com/requests_images";
//   const storage = getStorage();
//   const ref = ref(storage, 'image.jpg');

//   const img = await fetch(imgUri);
//   const bytes = await img.blob();
//   await uploadBytes(ref, bytes);
// }
// ------------------------------------------Announcement----------------------------------------------------
export async function fetchAnnouncements() {
  const checkAnnouncements = await axios.get(database);

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
      announcementsData.students,
      announcementsData.workingHours
    );
    announcements = announcement;
  }
  return announcements;
}

// --------------------------------------------Student-------------------------------------------------------
// this method can be used to add new student object to students object
// each new student object has a unique key generated by default by firebase
export async function registerStudent(studentInfo) {
  const token = generateRandomNumber();
  studentInfo["verification"] = token;
  sendMail(
    studentInfo["Email"],
    "Verify your account",
    studentInfo["FName"] + " " + studentInfo["LName"],
    "Please verify your email with the following token",
    token
  );
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
    if (studentData.Email == email) {
      studentID = key;
    }
  }
  return studentID;
}

export async function postBorrowRequest(isbn, title, userEmail, userKey) {
  // Hisham start
  const borrowData = {
    isbn: isbn,
    title: title,
    userEmail: userEmail,
    userKey: userKey,
  };
  const response = await axios.get(database + "borrow_requests.json");
  for (const key in response.data) {
    let currentBorrow = response.data[key];
    if (currentBorrow.isbn == isbn && currentBorrow.userEmail == userEmail) {
      alert("A request for this book have been submitted already");
      return;
    }
  }
  await axios.post(database + "borrow_requests.json", borrowData);
  // Hisham close
  await postBorrowRequestToStudent(isbn, userKey);
}

export async function postBorrowRequestToStudent(isbn, userKey) {
  let link = database + "students/" + userKey + ".json";
  let result = await axios.get(link);
  let res = result.data;
  if (!!!res?.borrowedBooks) {
    const temp = new Student(
      res.FName,
      res.LName,
      res.Email,
      res.psw,
      { [isbn]: "pending" },
      res.favBooks
    );
    temp["verification"] = "done";
    // res[isbn] = "pending";
    axios.put(link, temp);
    // Hisham added
    alert("Your borrow request have been submitted ");
    // Hisham close
  } else {
    link = database + "students/" + userKey + "/borrowedBooks.json";
    result = await axios.get(link);
    res = result.data;
    // Hisham start
    if (res[isbn] != null) {
      alert("A request for this book have been submitted already");
    } else {
      // Hisham close

      res[isbn] = "pending";
      axios.put(link, res);
      // Hisham start
      alert("Your borrow request have been submitted ");
    }
    // Hisham close
  }
}
// -------------------------------------adding book to fav list---------------------------------------------
export async function updateFavList(ID, student, Token) {
  student["verification"] = Token;
  //###
  //to keep borrowedBooks the same
  let link = database + "students/" + ID + "/borrowedBooks.json";
  let result = await axios.get(link);
  let res = result.data;

  if (!!res) {
    let updateStudent = { ...student, borrowedBooks: res };
    student = updateStudent;
  }
  //###
  axios.put(database + `students/${ID}.json`, student);
}

export async function addToFavList(studentID, isbn) {
  //fetching the user's object
  let link = database + "students/" + studentID + ".json";
  let result = await axios.get(link);
  let res = result.data;

  //if the user has a list of favorites -> add the isbn to it,
  //otherwise create a new list with this isbn and add it to the student object
  if (!!res?.favBooks) {
    //favBooks exists
    res.favBooks = [...res.favBooks, isbn];
  } else {
    //favBooks does not exist
    res["favBooks"] = [isbn];
  }

  //upload to database
  axios.put(link, res);
  alert("Book is added to favorites");
}

export async function removeFromFavList(studentID, isbn) {
  //fetching the user's current favorites
  let link = database + "students/" + studentID + "/favBooks.json";
  let result = await axios.get(link);
  let res = result.data;

  //removing the isbn of the book from the list
  res = res.filter((currentIsbn) => {
    return currentIsbn != isbn;
  });

  //uploading the new list
  axios.put(link, res);
  alert("Book is removed from favorites");
}

// added
// -------------------------------------Verification Functions---------------------------------------------

export async function getVerification(studentID) {
  const link = database + "students/" + studentID + ".json";
  const result = await axios.get(link);
  let res = result.data.verification;
  return res;
}

export async function putVerification(studentID, verification) {
  const link = database + "students/" + studentID + ".json";
  var result = await axios.get(link);
  var res = result.data;
  res["verification"] = verification;
  axios.put(link, res);
}
// ---------------------------------------- payment ----------------------------------------------------
export async function checkPayment(cardNumber) {
  // getting card info of a specifc card!
  const paymentInfo = await axios.get(database + `cards/${cardNumber}.json`);
  return paymentInfo;
}
export async function pay(cardNumber, fineAmount) {
  // getting card info of a specifc card!
  const paymentInfo = await axios.get(database + `cards/${cardNumber}.json`);
  const newBalance = paymentInfo.data.credit - fineAmount;
  const newPaymentInfo = { ...paymentInfo.data, credit: newBalance };
  await axios.put(database + `cards/${cardNumber}.json`, newPaymentInfo);
  // return paymentInfo;
}
export async function giveGracePeriod(studentID) {
  //1- We get current student data, so we update info currectly
  const response = await axios.get(database + `students/${studentID}.json`);
  let updatedData = response.data;
  // 2- This function gives grace period to any book that is overdue
  let updatedBorrowed = updatedListOfBorrowedBooks(updatedData.borrowedBooks);
  // 3- we put the new date (grace period) into the object we got containing student info from db
  updatedData = { ...updatedData, borrowedBooks: updatedBorrowed };
  await axios.put(database + `students/${studentID}.json`, updatedData);
}
