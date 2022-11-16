import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { HeaderBackButton } from "react-navigation-stack";
import { StackActions } from "@react-navigation/native";

import Input from "../components/AddBookComponents/Input";
import MyButton from "../components/MyButton";
import ErrorComponent from "../components/RegisterAndLogin/ErrorComponent";
import Title from "../components/Title";
import DropDownMenu from "../components/AddBookComponents/Drop_Down_Menu";

function AddBookScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerLeft:
        Platform.OS === "android"
          ? () => (
              <HeaderBackButton
                onPress={() => {
                  // This will remove The previous screen (Barcode scanner screen)
                  navigation.dispatch(StackActions.popToTop());
                }}
              />
            )
          : undefined,
    }); // if platform is IOS don't do anything
  }, []);
  const Route = useRoute();
  const isbn = parseInt(Route.params.bookId);

  const [inputs, setInputs] = useState({
    //default input values
    isbn: { value: isbn.toString(), isValid: true },
    title: { value: "", isValid: true },
    author: { value: "", isValid: true },
    date: { value: "", isValid: true },
    category: { value: "", isValid: true },
    summary: { value: "", isValid: true },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true }, //assume it's true here
        //we check whther the input is valid or not during submission
      };
    });
  }

  function submitHandler() {
    //taking the inputs
    const bookData = {
      isbn: +inputs.isbn.value, //converting the string to a number
      title: inputs.title.value,
      author: inputs.author.value,
      date: new Date(inputs.date.value),
      category: inputs.category.value,
      summary: inputs.summary.value,
    };

    //checking if the inputs are valid
    const titleIsValid = bookData.title.trim().length > 0;
    const authorIsValid = bookData.author.trim().length > 0;
    //JS returns 'Invalid Date' if invalid date is passed when creating a new date object
    const dateIsValid = bookData.date.toString() !== "Invalid Date";
    // const categoryIsValid = bookData.category.trim().length > 0;

    //if one of the inputs is invalid..
    if (
      !titleIsValid ||
      !authorIsValid ||
      !dateIsValid /*|| !categoryIsValid*/
    ) {
      setInputs((curInputs) => {
        return {
          isbn: { value: curInputs.isbn.value, isValid: true },
          title: { value: curInputs.title.value, isValid: titleIsValid },
          author: { value: curInputs.author.value, isValid: authorIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          category: {
            value: curInputs.category.value,
            // isValid: categoryIsValid,
            isValid: true,
          },
          summary: { value: curInputs.summary.value, isValid: true },
        };
      });

      console.log(inputs);
      return;
    }

    // console.log(inputs);
    // if input is valid..
    // onSubmit(bookData); //imp
  }

  //list of categories (test)
  const CATEGORIES = [
    { label: "Math", value: "math" },
    { label: "Science", value: "science" },
    { label: "Harith", value: "harith" },
  ];

  //helper variable to display form error text if some input is invalid
  const formIsInvalid =
    !inputs.isbn.isValid ||
    !inputs.title.isValid ||
    !inputs.author.isValid ||
    !inputs.date.isValid ||
    !inputs.category.isValid ||
    !inputs.summary.isValid;

  return (
    <View>
      <ScrollView>
        <Title>Add Book</Title>

        {/* Using the Input component to create input fields */}
        <Input //ISBN
          label="ISBN"
          invalid={!inputs.isbn.isValid}
          textInputConfig={{
            editable: false,
            value: inputs.isbn.value,
          }}
        />

        <Input //Book Title
          label="Title"
          invalid={!inputs.title.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "title"),
          }}
        />

        <DropDownMenu
          label={"Category"}
          elements={CATEGORIES}
          dropDownConfig={{
            search: true,
            searchPlaceholder: "Search...",
            value: inputs.category.value,
            onChange: (item) => {
              inputChangedHandler("category", item.value);
            },
          }}
        />
        {/* <Input //Category
            label="Category"
            invalid={!inputs.category.isValid}
            textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "category"),
            }}
        /> */}

        <Input //Author
          label="Author"
          invalid={!inputs.author.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "author"),
          }}
        />

        <Input //Date
          label="Publish Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
          }}
        />

        <Input //Summary
          label="Summary"
          invalid={!inputs.summary.isValid}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, "summary"),
          }}
        />

        {/* if the some input is invalid, display an error text */}
        {formIsInvalid && (
          <ErrorComponent style={styles.errorText}>
            Invalid input values, please check your entered data
          </ErrorComponent>
        )}

        <MyButton onPress={submitHandler}>Submit</MyButton>
      </ScrollView>
    </View>
  );
}

export default AddBookScreen;

const styles = StyleSheet.create({
  errorText: {
    textAlign: "center",
    margin: 8,
    color: "red",
  },
});
