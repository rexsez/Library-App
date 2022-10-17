import Book from "../models/Book";

// export const BADGES = [
    //can decide the badges here
    //might need to make a new Badge class in models
// ]

//**Dummy book for testing**
//Later we will query this data from the database
export const BOOKS = [
  new Book(
    3456456, //isbn
    "book title", //title
    '../assets/icon.png', //imageUrl
    "This is some dummy author name", //author
    Date.now(), //date
    "genre", //genre
    3, //rating
    false, //borrowed
    null, //badge
  ),
];
