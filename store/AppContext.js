import { createContext, useState } from "react";

export const AppContext = createContext({
  books: [],
  changeBooks: () => {},
  categories: [],
  changeCategories: () => {},
  currentScreen: "",
  changeScreenHandler: () => {},
});

function AppContextProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentScreen, setScreenHandler] = useState("Home");

  function changeBooks(newBooks) {
    setBooks(newBooks);
  }
  function changeCategories(newCategory) {
    setCategories(newCategory);
  }

  function changeScreenHandler(newScreen) {
    setScreenHandler(newScreen);
  }

  const value = {
    books: books,
    changeBooks: changeBooks,
    categories: categories,
    changeCategories: changeCategories,
    currentScreen: currentScreen,
    changeScreenHandler: changeScreenHandler,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export default AppContextProvider;
