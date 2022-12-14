import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text /*Image*/, Platform, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { HeaderBackButton } from "react-navigation-stack";
import { StackActions } from "@react-navigation/native";
// import * as imagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

import Input from "../components/AddBookComponents/Input";
import MyButton from "../components/MyButton";
import ErrorComponent from "../components/RegisterAndLogin/ErrorComponent";
import DropDownMenu from "../components/AddBookComponents/Drop_Down_Menu";
import { AppContext } from "../store/AppContext";
import { requestBook /*uploadImage*/ } from "../components/Utility/http";
import Colors from "../components/Utility/Colors";
import { containsOnlyNumbers } from "../components/Utility/UtilityFunctions";

function AddBookScreen({ navigation }) {
  const appCtx = useContext(AppContext);

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
  const isbn = Route.params.bookId;
  const fetchedISBN = isbn;

  const [inputs, setInputs] = useState({
    //default input values
    isbn: { value: isbn.toString(), isValid: true },
    title: { value: "", isValid: true },
    author: { value: "", isValid: true },
    image: { value: "", isValid: true },
    date: { value: "", isValid: true },
    category: { value: "", isValid: true },
    summary: { value: "", isValid: true },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true }, //assume it's true here
        //we check whether the input is valid or not during submission
      };
    });
  }

  // const pickImage = async () => {
  //   let result = await imagePicker.launchImageLibraryAsync({
  //     mediaTypes: imagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 6],
  //     quality: 1,
  //   });

  //   const titleIsValid = titleIsValid == null ? true : titleIsValid;
  //   const dateIsValid = dateIsValid == null ? true : dateIsValid;
  //   const source = { uri: result.uri };
  //   setInputs((curInputs) => {
  //     return {
  //       ...curInputs,
  //       ["image"]: { value: source, isValid: true },
  //     };
  //   });
  // };

  function submitHandler() {
    //taking the inputs
    const bookData = {
      isbn: inputs.isbn.value,
      title: inputs.title.value,
      author: inputs.author.value,
      image: inputs.image.value,
      date: new Date(inputs.date.value),
      category: inputs.category.value,
      summary: inputs.summary.value,
    };

    //checking if the inputs are valid
    const titleIsValid = bookData.title.trim().length > 0;
    // const authorIsValid = bookData.author.trim().length > 0;
    let dateIsValid = true;
    if (inputs.date.value !== "") {
      //checking if date matches the regex "YYYY-MM-DD" and it's valid
      //JS returns 'Invalid Date' if invalid date is passed when creating a new date object
      dateIsValid =
        bookData.date.toString() !== "Invalid Date" &&
        inputs.date.value.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
    }
    let isbnIsValid = false;
    if (
      (inputs.isbn.value.length === 13 || inputs.isbn.value.length === 10) &&
      containsOnlyNumbers(inputs.isbn.value)
    ) {
      isbnIsValid = true;
    }
    if (
      !isbnIsValid ||
      !titleIsValid ||
      // !authorIsValid ||
      !dateIsValid /*|| !categoryIsValid*/
    ) {
      // const categoryIsValid = bookData.category.trim().length > 0;

      //if one of the inputs is invalid..
      setInputs((curInputs) => {
        return {
          isbn: { value: curInputs.isbn.value, isValid: isbnIsValid },
          title: { value: curInputs.title.value, isValid: titleIsValid },
          author: { value: curInputs.author.value, isValid: true },
          image: { value: curInputs.image.value, isValid: true },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          category: {
            value: curInputs.category.value,
            isValid: true,
          },
          summary: { value: curInputs.summary.value, isValid: true },
        };
      });

      return;
    }

    //inputs are valid -> create data object and call the onsubmit function
    const requestData = {
      isbn: inputs.isbn.value,
      title: inputs.title.value,
      category: inputs.category.value,
      image: inputs.image.value,
      author: inputs.author.value,
      date: inputs.date.value,
      summary: inputs.summary.value,
    };
    onSubmit(requestData);
  }

  //call the requestBook function from the http and pass the data object to it
  async function onSubmit(requestedData) {
    // if (requestedData.image.value != "") {
    //   // const img = await fetch(inputs.image.value.uri);
    //   // const bytes = await img.blob();
    //   const filename =
    //     // isbn.toString() +
    //     inputs.image.value.uri.substring(
    //       inputs.image.value.uri.lastIndexOf("/") + 1
    //     );
    //   await uploadImage(inputs.image.value.uri);
    //   requestedData.image.value = filename;
    // }
    await requestBook(requestedData);
    appCtx.changeScreenHandler("Home");
    if (fetchedISBN == "") {
      // Alert.alert("Your book request is recorded",[{}]);
      Alert.alert(" Submitted", "Your request has been submitted", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      navigation.navigate("DrawerHome");
    } else {
      navigation.navigate("TabSearch", { request: true });
    }
  }

  //helper variable to display form error text if some input is invalid
  const formIsInvalid =
    !inputs.isbn.isValid ||
    !inputs.title.isValid ||
    !inputs.author.isValid ||
    !inputs.date.isValid ||
    !inputs.category.isValid ||
    !inputs.summary.isValid;
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      locations={[0, 0.5, 0.6]}
      // Background Linear Gradient
      colors={[Colors.primary500, "whitesmoke", Colors.primary500]}
      style={styles.linearGradient}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Request Book</Text>
      </View>

      <ScrollView>
        <View style={styles.rootContainer}>
          {/* <Title>Request Book</Title> */}
          {/* <Text style={styles.title}>Add Book</Text> */}
          {/* Using the Input component to create input fields */}

          <Input //ISBN
            label="ISBN"
            labelStyle={styles.label}
            invalid={!inputs.isbn.isValid}
            textInputConfig={{
              value: inputs.isbn.value,
              onChangeText: inputChangedHandler.bind(this, "isbn"),
            }}
          />

          <Input //Book Title
            label="Title"
            labelStyle={styles.label}
            invalid={!inputs.title.isValid}
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, "title"),
            }}
          />

          {/* <View style={styles.pickImageContainer}>
            <MyButton
            onPress={pickImage}
            Flate={true}
            style={styles.buttonStyles}
            textStyle={styles.buttonText}
            >
            Pick Image
            </MyButton>
            {inputs.image.value != "" && (
              <Image
              source={{ uri: inputs.image.value.uri }}
              style={styles.bookImage}
              />
              )}
            </View> */}
          {/* <Text style={styles.label}>Author</Text> */}
          <Input //Author
            label="Author"
            labelStyle={styles.label}
            invalid={!inputs.author.isValid}
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, "author"),
            }}
          />

          <DropDownMenu //Category
            style={styles.dropdown}
            label={"Category"}
            labelStyle={styles.label}
            elements={appCtx.categories}
            dropDownConfig={{
              dropdownPosition: "bottom",
              search: true,
              searchPlaceholder: "Search...",
              value: inputs.category.value,
              onChange: (item) => {
                inputChangedHandler("category", item.value);
              },
            }}
          />

          <Input //Date
            label="Publish Date"
            labelStyle={styles.label}
            invalid={!inputs.date.isValid}
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangedHandler.bind(this, "date"),
            }}
          />

          <Input //Summary
            label="Summary"
            labelStyle={styles.label}
            invalid={!inputs.summary.isValid}
            textInputConfig={{
              multiline: true,
              onChangeText: inputChangedHandler.bind(this, "summary"),
            }}
          />

          {formIsInvalid && (
            <View style={styles.errorContainer}>
              <ErrorComponent errorColor={"red"}>
                Invalid input. Please make sure there's a title and the date
                format is YYYY-MM-DD
              </ErrorComponent>
            </View>
          )}

          <MyButton
            onPress={submitHandler}
            Flate={true}
            style={styles.buttonStyles}
            textStyle={styles.buttonText}
          >
            Submit
          </MyButton>
          {/* </LinearGradient> */}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default AddBookScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  titleContainer: {
    padding: 15,
    backgroundColor: Colors.primary500,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 70,
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1.5,
    fontSize: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  dropdown: {
    marginTop: 12,
  },
  // pickImageContainer: {
  //   flexDirection: "row",
  // },
  // bookImage: {
  //   width: 100,
  //   height: 150,
  // },
  buttonStyles: {
    marginTop: 8,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
    borderWidth: 2,
    borderRadius: 6,
    width: "50%",
    padding: 5,
  },
  buttonText: {
    fontSize: 24,
    color: Colors.primary500,
  },
  linearGradient: {
    flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    borderRadius: 5,
  },
  errorContainer: {
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 24,
    backgroundColor: "whitesmoke",
  },
});
