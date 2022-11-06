import { createContext, useReducer } from "react";
import Student from "../models/Student";

export const StudentContext = createContext({
  //  identifying what should be in the context
  student: {
    FName: "",
    LName: "",
    Email: "",
    psw: "",
    barrowedBooks: [],
    favBooks: [],
  },
  //  identifying whart operations context should do
  // Should add more (add barrowed, add fav)
  registerStudent: ({ FName, LName, Email, Password }) => {},
  editStudent: (Email, { FName, LName, Password }) => {},
});
// ----------------------------------------------------------------------------
// reducer function holds all the different functions that
//  can be done on the context through the dispatcher.
function StudentReducer(state, action) {
  switch (action.type) {
    case "UPDATE": {
      const updatedStudent = { ...state, ...action.payload.studentData };
      return updatedStudent;
    }
    case "ADD":
      let studentData = action.payload;
      console.log(studentData);

      const temp = new Student(
        studentData.FName,
        studentData.LName,
        studentData.Email,
        studentData.psw,
        studentData.barrowedBooks,
        studentData.favBooks
      );
      return temp;
  }
}
function StudentContextProvidor({ children }) {
  const student = {
    FName: "",
    LName: "",
    Email: "",
    psw: "",
    barrowedBooks: [],
    favBooks: [],
  };
  const [studentState, dispatch] = useReducer(StudentReducer, student);
  function registerStudent(studentData) {
    dispatch(
      {
        type: "ADD",
        payload: studentData,
      },
      StudentContext
    );
  }
  function editStudent(Email, studentData) {
    dispatch(
      {
        type: "UPDATE",
        payload: {
          data: studentData,
          Email: Email,
        },
      },
      ExpensesContext
    );
  }
  // --------------------------------------------------------
  // More functions needs to be added (add fav, add barrowed)
  // --------------------------------------------------------
  // Here where we link useReducer with useContext.

  const value = {
    student: studentState,
    registerStudent: registerStudent,
    editStudent: editStudent,
    // ------------------------------------------------------
    // More Functions to be added here (barrowed, fag)
    // ------------------------------------------------------
  };
  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
}
export default StudentContextProvidor;
