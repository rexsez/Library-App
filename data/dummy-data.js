import Book from "../models/Book";
import {
  generateISBN,
  generateSummary,
  generateName,
  generateTitle,
} from "../components/Utlity/Testing/RandomGenerators";

// export const BADGES = [
//can decide the badges here
//might need to make a new Badge class in models
// ]

//**Dummy book for testing**
//Later we will query this data from the database

// Keeping the first book as it is so we know if there is a prob.
export const BOOKS = [
  new Book(
    1,
    9780076577040, //isbn
    "book title", //title
    "../assets/icon.png", //imageUrl
    "This is some dummy author name", //author
    new Date("1818-12-15"), //date
    "math", //genre
    "some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary ",
    Math.floor(Math.random() * (5 - 0 + 1) + 0.5),
    false, //borrowed
    null //badge
  ),
  new Book(
    1,
    9780076577041, //isbn
    "book title", //title
    "../assets/icon.png", //imageUrl
    "This is some dummy author name", //author
    new Date("1817-12-15"), //date
    "science", //genre
    "some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary ",
    Math.floor(Math.random() * (5 - 0 + 1) + 0), // rating
    false, //borrowed
    null //badge
  ),
  new Book(
    1,
    9780076577042, //isbn
    "book title", //title
    "../assets/icon.png", //imageUrl
    "This is some dummy author name", //author
    new Date("1817-12-08"), //date
    "harith", //genre
    "some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary ",
    Math.floor(Math.random() * (5 - 0 + 1) + 0), // rating
    false, //borrowed
    null //badge
  ),
  new Book(
    1,
    9780076577043, //isbn
    "book title", //title
    "../assets/icon.png", //imageUrl
    "This is some dummy author name", //author
    new Date("1818-10-15"), //date
    "harithhhh", //genre
    "some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary some summary ",
    Math.floor(Math.random() * (5 - 0 + 1) + 0), // rating
    false, //borrowed
    null //badge
  ),
];

// Generating random books
for (let i = 0; i < 30; i++) {
  let book = new Book(
    1,
    generateISBN(),
    generateTitle(),
    "../assets/icon.png",
    generateName(),
    new Date("1818-12-15"),
    generateTitle(),
    generateSummary(),
    Math.floor(Math.random() * (5 - 0 + 1) + 0), // rating
    false,
    null
  );
  BOOKS.push(book);
}
export const STUDENS = [];
