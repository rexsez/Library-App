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
    "../assets/icon.png", //imageUrl
    "This is some dummy author name", //author
    new Date('1818-12-15'), //date
    "genre", //genre
    "some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary ",
    3, //rating
    false, //borrowed
    null //badge
  ),
];
