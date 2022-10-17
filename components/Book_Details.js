import { View, Text, StyleSheet, Image } from "react-native";

import { FontAwesome5, Fontisto, Entypo, Ionicons } from "@expo/vector-icons";
import BookSubdetail from "./Book_Subdetail";

function BookDetails({ isbn, author, date, genre, bookImage }) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        {bookImage !== null ? (
          <Image
            style={styles.image}
            source={bookImage}
            /* Dummy image source to test */
          />
        ) : (
          //Display this view if no image is found
          <View>
            <Text>No book image</Text>
          </View>
        )}
      </View>
      <View style={styles.bookDeatilsContainer}>
        <BookSubdetail
          icon={<FontAwesome5 name={"signature"} size={18} />}
          text={author}
        />
        <BookSubdetail
          icon={<Fontisto name={"date"} size={18} />}
          text={date}
        />
        <BookSubdetail icon={<Entypo name={"tag"} size={18} />} text={genre} />
        <BookSubdetail
          icon={<Ionicons name={"barcode-outline"} size={18} />}
          text={isbn}
        />
      </View>
    </View>
  );
}

export default BookDetails;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 4,
    elevation: 4,
  },
  bookDeatilsContainer: {
    marginLeft: 8,
  },
  imageContainer: {
    marginRight: 8,
  },
  image: {
    height: 150,
    width: 100,
  },
});
