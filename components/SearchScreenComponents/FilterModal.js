import { useState } from "react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";
import Modal from "react-native-modal";
import RadioButtonRN from "radio-buttons-react-native";

import { CATEGORIES } from "../../data/Book_Categories";
import DropDownMenu from "../AddBookComponents/Drop_Down_Menu";
import SliderExample from "../Utlity/SliderExample";

const filterationOptions = [
  {
    label: "Title",
  },
  {
    label: "Author",
  },
  {
    label: "Date",
  },
  {
    label: "Rating",
  },
];
const orderOptions = [
  {
    label: "Ascending",
  },
  {
    label: "Descending",
  },
];

function FilterModal({ currentBooks, setBooks, isModalVisible, toggleModal }) {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState();
  const [filter, setFilter] = useState();
  const [orderBy, setOrderBy] = useState("descending");

  function handleRadioSortBy(input) {
    // This is ti change an object to a string, source is below
    // https://www.w3schools.com/js/js_json_stringify.asp#:~:text=Stringify%20a%20JavaScript%20Object&text=Use%20the%20JavaScript%20function%20JSON,string%20following%20the%20JSON%20notation.
    var str = JSON.stringify(input);
    // This is basically to take the string as what's after the :, input will be in this format
    // {label: "Title"}  -> So it will become "Title"}
    str = str.substring(str.indexOf(":") + 1);
    // This is to remove all the non-characters
    str = str.replace(/\W/g, "");
    setFilter(str);
  }

  function handleRadioOrderBy(input) {
    // This is ti change an object to a string, source is below
    // https://www.w3schools.com/js/js_json_stringify.asp#:~:text=Stringify%20a%20JavaScript%20Object&text=Use%20the%20JavaScript%20function%20JSON,string%20following%20the%20JSON%20notation.
    var str = JSON.stringify(input);
    // This is basically to take the string as what's after the :, input will be in this format
    // {label: "Title"}  -> So it will become "Title"}
    str = str.substring(str.indexOf(":") + 1);
    // This is to remove all the non-characters
    str = str.replace(/\W/g, "");
    setOrderBy(str);
  }
  function inputChangedHandler(enteredValue) {
    setCategory(enteredValue);
  }

  function filterBooks() {
    var rate = JSON.stringify(rating);
    rate = rate.replace(/\[|\]/g, "");
    rate = parseFloat(rate);
    console.log(typeof rate);
    console.log(rate);
    if (category) {
      var cat = JSON.stringify(category);
      cat = cat.replace(/\W/g, "");
      cat = cat.toLowerCase();
      const selectedBook = currentBooks.filter(
        (book) => book.genre.toLowerCase() === cat && book.rating >= rate
      );
      if (selectedBook) {
        setBooks(selectedBook);
      } else {
        setBooks(null);
      }
      setCategory();
      setRating(0);
      toggleModal();
    } else {
      const selectedBook = currentBooks.filter((book) => book.rating >= rate);
      if (selectedBook) {
        setBooks(selectedBook);
      } else {
        setBooks(null);
      }
      toggleModal();
    }
  }

  function sortingBooks() {}

  return (
    <Modal isVisible={isModalVisible}>
      <View>
        <ScrollView>
          <View style={styles.Container}>
            <Text style={styles.headerText}>Filter By</Text>
            <DropDownMenu //Category
              label={"Category"}
              elements={CATEGORIES}
              dropDownConfig={{
                // value: inputs.category.value,
                onChange: (item) => {
                  inputChangedHandler(item.value);
                },
              }}
            />
            <Text style={[styles.headerText, { borderBottomWidth: 0 }]}>
              minimum rating
            </Text>
            <SliderExample rating={rating} setRating={setRating} />
            <Text style={styles.headerText}>Sort By</Text>
            <RadioButtonRN
              data={filterationOptions}
              selectedBtn={(e) => handleRadioSortBy(e)}
            />
            <Text style={styles.headerText}>Order By</Text>
            <RadioButtonRN
              data={orderOptions}
              selectedBtn={(e) => handleRadioOrderBy(e)}
            />
            <Button title="Done" onPress={filterBooks} color={"#1b7ce4"} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default FilterModal;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerText: {
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 26,
    borderBottomWidth: 0.5,
  },
});
