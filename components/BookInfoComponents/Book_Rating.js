import { useContext, useState } from "react";
import { View, Text, StyleSheet, Modal, Button } from "react-native";
import { StudentContext } from "../../store/StudentContext";
import MyButton from "../MyButton";
import { postRating } from "../Utlity/http";

import SliderExample from "../Utlity/SliderExample";

function BookRatingModal({
  visible,
  rate,
  changeVisibility,
  studentID,
  bookID,
}) {
  const studentCtx = useContext(StudentContext);
  //   // to get the list of books
  //   const appCtx = useContext(AppContext);
  //   // to get student info and use it to rate a book
  //   const studentCtx = useContext(StudentContext);

  const [rating, setRating] = useState(rate);

  function closeModal() {
    changeVisibility(!visible);
  }

  function rateBook(rating) {
    var rate = JSON.stringify(rating);
    // Removing brackets from the string, by default the rate would have this format [rate]
    rate = rate.replace(/\[|\]/g, "");
    // Converting it to a float so we could use comparison operations
    postRating(studentID, bookID, rate);
    changeVisibility(!visible);
  }
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <SliderExample rating={rating} setRating={setRating} />
            <View style={styles.row}>
              <Button title="Cancel" color={"tomato"} onPress={closeModal} />
              <Button title="Rate" onPress={rateBook.bind(this, rating)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 330,
    flex: 0.15,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BookRatingModal;
