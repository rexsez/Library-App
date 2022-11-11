class Book {
  constructor(
    isbn,
    title,
    imageUrl,
    author,
    date,
    genre,
    summary,
    rating,
    borrowed,
    badge
  ) {
    this.isbn = isbn;
    this.title = title;
    this.imageUrl = imageUrl;
    this.author = author;
    this.date = date;
    this.genre = genre;
    this.summary = summary;
    this.rating = rating;
    this.borrowed = borrowed;
    this.badge = badge;
  }
}

export default Book;
