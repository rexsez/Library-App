import { createContext, useReducer, useState } from "react";
import Student from "../models/Student";

export const StudentContext = createContext({
  //  identifying what should be in the context
  student: {
    FName: "",
    LName: "",
    Email: "",
    psw: "",
    borrowedBooks: [],
    favBooks: [],
  },
  //  identifying what operations context should do
  // Should add more (add borrowed, add fav)
  registerStudent: ({
    FName,
    LName,
    Email,
    Password,
    borrowedBooks,
    favBooks,
  }) => {},
  editStudent: () => {},
  // Will be needed when we try to change themes
  isDarkTheme: false,
  toggleTheme: () => {},
  // Needed to track book ratings
  ID: "",
  setID: () => {},
  Token: "",
  setToken: () => {},
});
// ----------------------------------------------------------------------------
// reducer function holds all the different functions that
//  can be done on the context through the dispatcher.
function StudentReducer(state, action) {
  switch (action.type) {
    case "UPDATE": {
      const updatedStudent = {
        FName: "",
        LName: "",
        Email: "",
        Password: "",
        borrowedBooks: [],
        favBooks: [],
      };
      return updatedStudent;
    }
    case "ADD":
      let studentData = action.payload;
      // console.log(studentData);

      const temp = new Student(
        studentData.FName,
        studentData.LName,
        studentData.Email,
        studentData.psw,
        studentData.borrowedBooks,
        studentData.favBooks
      );
      return temp;
  }
}
function StudentContextProvider({ children }) {
  const student = {
    FName: "",
    LName: "",
    Email: "",
    psw: "",
    borrowedBooks: [],
    favBooks: [],
  };
  const [studentState, dispatch] = useReducer(StudentReducer, student);
  const [isDarkTheme, setDarkTheme] = useState(false);
  const [ID, setStudentID] = useState();
  const [Token, setTokenNew] = useState();
  function registerStudent(studentData) {
    dispatch(
      {
        type: "ADD",
        payload: studentData,
      },
      StudentContext
    );
  }
  function editStudent() {
    dispatch(
      {
        type: "UPDATE",
        payload: {},
      },
      StudentContext
    );
  }
  function toggleTheme() {
    setDarkTheme(!isDarkTheme);
  }

  function setID(StudentDatabaseID) {
    setStudentID(StudentDatabaseID);
  }
  function setToken(Token) {
    setTokenNew(Token);
  }
  // --------------------------------------------------------
  // More functions needs to be added (add fav, add barrowed)
  // --------------------------------------------------------
  // Here where we link useReducer with useContext.

  const value = {
    student: studentState,
    registerStudent: registerStudent,
    editStudent: editStudent,
    isDarkTheme: isDarkTheme,
    toggleTheme: toggleTheme,
    ID: ID,
    setID: setID,
    Token: Token,
    setToken: setToken,
    // ------------------------------------------------------
    // More Functions to be added here (barrowed, fag)
    // ------------------------------------------------------
  };
  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
}
export default StudentContextProvider;
