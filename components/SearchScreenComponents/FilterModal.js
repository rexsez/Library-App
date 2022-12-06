import { useContext, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  // Alert,
} from "react-native";
import Modal from "react-native-modal";
import RadioButtonRN from "radio-buttons-react-native";

import DropDownMenu from "../AddBookComponents/Drop_Down_Menu";
import SliderExample from "../Utlity/SliderExample";
import {
  AscendingTitle,
  DescendingTitle,
  AscendingAuthor,
  DescendingAuthor,
  AscendingDate,
  DescendingDate,
  AscendingRating,
  DescendingRating,
} from "../Utlity/UtilityFunctions";
import { AppContext } from "../../store/AppContext";

// This is going to be used to show filter options as a radio button
// label is needed for radio button to work

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

// This is going to be used for Sorting options
const orderOptions = [
  {
    label: "Ascending",
  },
  {
    label: "Descending",
  },
];

// The point of this JS is to show a modal that shows filtration options along with sorting options
// Taken from the following repository:
// https://github.com/react-native-modal/react-native-modal
function FilterModal({
  chosenFilter,
  setChosenFilter,
  chosenOrder,
  setChosenOrder,
  currentBooks,
  setBooks,
  isModalVisible,
  toggleModal,
  SearchFilter,
  currentSearch,
}) {
  const appCtx = useContext(AppContext);
  var current = [...currentBooks];
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState();
  const [filter, setFilter] = useState();
  const [orderBy, setOrderBy] = useState();
  // console.log(rating);

  // Here we handle the options that is chosen as a sort options
  // it could be Title, Author, Date and Rating
  function handleRadioSortBy(input) {
    // This is to change an object to a string, source is below
    // https://www.w3schools.com/js/js_json_stringify.asp#:~:text=Stringify%20a%20JavaScript%20Object&text=Use%20the%20JavaScript%20function%20JSON,string%20following%20the%20JSON%20notation.
    var filterOption = JSON.stringify(input);
    // This is basically to take the string as what's after the :, input will be in this format
    // {label: "Title"}  -> So it will become "Title"}
    filterOption = filterOption.substring(filterOption.indexOf(":") + 1);
    // This is to remove all the non-characters
    filterOption = filterOption.replace(/\W/g, "");
    // making it lowercase
    filterOption = filterOption.toLowerCase();
    setFilter(filterOption);
  }

  // Here we handle the order criteria  that is chosen as a sorting method
  // it could be Ascending or Descending
  function handleRadioOrderBy(input) {
    // This is to change an object to a string, source is below
    // https://www.w3schools.com/js/js_json_stringify.asp#:~:text=Stringify%20a%20JavaScript%20Object&text=Use%20the%20JavaScript%20function%20JSON,string%20following%20the%20JSON%20notation.
    var order = JSON.stringify(input);
    // This is basically to take the string as what's after the :, input will be in this format
    // {label: "Title"}  -> So it will become "Title"}
    order = order.substring(order.indexOf(":") + 1);
    // This is to remove all the non-characters
    order = order.replace(/\W/g, "");
    // making it lowercase
    order = order.toLowerCase();
    setOrderBy(order);
  }
  function inputChangedHandler(enteredValue) {
    setCategory(enteredValue);
  }

  function cancel() {
    setChosenFilter(1);
    setChosenOrder(1);
    setCategory();
    setFilter();
    setOrderBy();
    setRating(0);
    SearchFilter(currentSearch);
    toggleModal();
  }

  // This function will be called once the DONE (after selecting all needed options) button
  // which is supposed to close the modal and do changes needed to the list of books
  function filterBooks() {
    // Converting rating from object type to String type
    var rate = JSON.stringify(rating);
    // Removing brackets from the string, by default the rate would have this format [rate]
    rate = rate.replace(/\[|\]/g, "");
    // Converting it to a float so we could use comparison operations
    rate = parseFloat(rate);
    // If a category is chosen it will enter the if, otherwise it will go to the else
    if (category) {
      // Converting rating from object type to String type
      var cat = JSON.stringify(category);
      // Removing quotations from the category, by default the category would have this format "Category"
      cat = cat.replace(/\W/g, "");
      // Making it lowercase to avoid case sensitive issues
      cat = cat.toLowerCase();
      // Here we filter the selected Books
      // (which is the list of books left as a result of the search the user made) and we also check for rating
      // if rating is not chosen as a criteria, its value will be zero, so it won't affect the result
      const selectedBook = appCtx.books.filter(
        (book) =>
          (book.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            book.author.toLowerCase().includes(currentSearch.toLowerCase())) &&
          book.genre.toLowerCase() === cat &&
          (book.rating >= rate || book.rating == -1)
      );
      // checking if there is a book with  the given criteria, to avoid null issues
      if (selectedBook) {
        current = selectedBook;
      } else {
        current = null;
      }
      // This is to sort the books by the given criteria
      sortingBooks();
      // The else will handle the case in which a category isn't chosen as an option
    } else {
      // Filtering books with ratings higher than the chosen rating
      const selectedBook = appCtx.books.filter(
        (book) =>
          (book.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            book.author.toLowerCase().includes(currentSearch.toLowerCase())) &&
          (book.rating >= rate || book.rating == -1)
      );
      // Checking if there is a book that have a rating that matches the criteria
      if (selectedBook) {
        current = selectedBook;
      } else {
        current = null;
      }
      // This is to sort the books by the given criteria
      sortingBooks();
    }
  }
  // This will be to sort the books by the given criteria
  function sortingBooks() {
    if (!filter && !orderBy) {
      setBooks(current);
      // this is will make the modal invisible
      toggleModal();
    } else {
      // The following code is needed if we don't want radio button to be chosen by default
      // if ((filter && !orderBy) || (orderBy && !filter)) {
      //   Alert.alert(
      //     "Invalid options",
      //     "Please ensure valid options are selected",
      //     [
      //       {
      //         text: "Okey",
      //         style: "cancel",
      //       },
      //     ]
      //   );
      // }
      if (orderBy === "ascending") {
        setChosenOrder(1);
        if (filter === "title") {
          setChosenFilter(1);
          current = current.sort(AscendingTitle);
          setBooks(current);
          toggleModal();
        } else if (filter === "author") {
          setChosenFilter(2);
          current = current.sort(AscendingAuthor);
          setBooks(current);
          toggleModal();
        } else if (filter === "date") {
          setChosenFilter(3);
          current = current.sort(AscendingDate);
          setBooks(current);
          toggleModal();
        } else {
          setChosenFilter(4);
          current = current.sort(AscendingRating);
          setBooks(current);
          toggleModal();
        }
      } else {
        setChosenOrder(2);
        if (filter === "title") {
          setChosenFilter(1);
          current = current.sort(DescendingTitle);
          setBooks(current);
          toggleModal();
        } else if (filter === "author") {
          setChosenFilter(2);
          current = current.sort(DescendingAuthor);
          setBooks(current);
          toggleModal();
        } else if (filter === "date") {
          setChosenFilter(3);
          current = current.sort(DescendingDate);
          setBooks(current);
          toggleModal();
        } else {
          setChosenFilter(4);
          current = current.sort(DescendingRating);
          setBooks(current);
          toggleModal();
        }
      }
    }
  }

  return (
    <Modal
      isVisible={isModalVisible}
      style={{
        backgroundColor: "white",
        width: "100%",
        alignSelf: "center",
        marginTop: 100,
      }}
    >
      <View>
        <ScrollView>
          <View style={styles.Container}>
            <Text style={styles.Text}>Filter By</Text>
            <DropDownMenu //Category
              label={category}
              elements={appCtx.categories}
              dropDownConfig={{
                onChange: (item) => {
                  inputChangedHandler(item.value);
                },
              }}
            />
            <Text style={[styles.Text, { borderBottomWidth: 0 }]}>
              Minimum Rating
            </Text>
            <SliderExample rating={rating} setRating={setRating} />
            <Text style={styles.Text}>Sort By</Text>
            {/* This component is taken from npm library, check the following link for info: */}
            {/* https://github.com/sramezani/radio-buttons-react-native#readme*/}
            <RadioButtonRN
              data={filterationOptions}
              selectedBtn={(e) => handleRadioSortBy(e)}
              initial={chosenFilter}
              activeColor="#1b7ce4"
            />
            <Text style={styles.Text}>Order By</Text>
            {/* This component is taken from npm library, check the following link for info: */}
            {/* https://github.com/sramezani/radio-buttons-react-native#readme*/}
            <RadioButtonRN
              data={orderOptions}
              selectedBtn={(e) => handleRadioOrderBy(e)}
              initial={chosenOrder}
              activeColor="#1b7ce4"
            />

            <View style={styles.btnsContainer}>
              {/* <MButton
                onPress={cancel}
                style={[styles.btnContainer, { backgroundColor: "tomato" }]}
                Flate={false}
              >
                Cancel
              </MButton> */}
              <View style={styles.btnContainer}>
                <Button title="Cancel" onPress={cancel} color="tomato" />
              </View>
              <View style={styles.btnContainer}>
                <Button title="Done" onPress={filterBooks} color="#1b7ce4" />
              </View>
              {/* <MyButton
                onPress={filterBooks}
                style={[styles.btnContainer, { backgroundColor: "#1b7ce4" }]}
                Flate={false}
              >
                Done
              </MyButton> */}
            </View>
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
  },
  headerText: {
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 26,
    borderBottomWidth: 0.5,
  },
  btnsContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginTop: 6,
    marginBottom: 12
  },
  btnContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  Text: {
    fontSize: 20,
    color: "gray",
  },
});
