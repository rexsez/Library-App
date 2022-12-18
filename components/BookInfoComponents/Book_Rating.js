import { useContext, useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
// Hisham added
import { FontAwesome } from "@expo/vector-icons";
import { deleteRating, postRating } from "../Utility/http";
// Hisham Close
import { StudentContext } from "../../store/StudentContext";
import MyButton from "../MyButton";
import Colors from "../Utility/Colors";
import SliderExample from "../Utility/SliderExample";

function BookRatingModal({
  visible,
  rate,
  changeVisibility,
  studentID,
  bookID,
  // Hisham added
  remove,
}) {
  let btn;
  if (remove == true) {
    btn = (
      <MyButton
        textStyle={styles.buttonText}
        style={[styles.buttonClose, { marginRight: 30 }]}
        onPress={removeRating}
      >
        Remove Rating
      </MyButton>
    );
  } else {
    btn = (
      <MyButton
        textStyle={styles.buttonText}
        style={[styles.buttonClose, { marginRight: 30 }]}
        onPress={closeModal}
      >
        Cancel
      </MyButton>
    );
  }

  function removeRating() {
    deleteRating(studentID, bookID);
    changeVisibility(!visible);
  }
  // Hisham Close
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
            {/* Hisham Start */}
            <View style={styles.CloseButton}>
              <View>
                <MyButton onPress={closeModal}>
                  <FontAwesome name="close" size={28} color="black" />
                </MyButton>
              </View>
            </View>
            {/* Hisham Close */}
            <SliderExample rating={rating} setRating={setRating} />
            <View style={styles.row}>
              {/* Hisham Start */}
              {btn}
              <MyButton
                textStyle={styles.buttonText}
                style={[styles.buttonRate, { marginRight: 30 }]}
                onPress={rateBook.bind(this, rating)}
              >
                {/* Hisham Close */}
                Rate
              </MyButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // Hisham Start
  CloseButton: {
    alignItems: "flex-end",
    marginEnd: 5,
  },
  // Hisham close
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 355,
    // Hisham start
    flex: 0.24,
    // Hisham close
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
  buttonRate: {
    backgroundColor: Colors.primary500,
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 22,
  },
  buttonClose: {
    backgroundColor: "tomato",
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "400",
  },
});
export default BookRatingModal;
