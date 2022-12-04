import { createContext, useState } from "react";

export const AppContext = createContext({
  books: [],
  changeBooks: () => {},
  categories: [],
  changeCategories: () => {},
});

function AppContextProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  function changeBooks(newBooks) {
    setBooks(newBooks);
  }
  function changeCategories(newCategory) {
    setCategories(newCategory);
  }

  const value = {
    books: books,
    changeBooks: changeBooks,
    categories: categories,
    changeCategories: changeCategories,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export default AppContextProvider;
