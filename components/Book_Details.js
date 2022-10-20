import { View, Text, StyleSheet, Image } from "react-native";

import { FontAwesome5, Fontisto, Entypo, Ionicons } from "@expo/vector-icons";
import BookSubdetail from "./Book_Subdetail";
import { getFotmattedDate } from "../util/date";

function BookDetails({ isbn, author, date, genre, bookImage }) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        {bookImage !== null ? ( // checking if we have an image or not
          //displaying the image
          <Image style={styles.image} source={bookImage} />
        ) : (
          //Display no book image text if we didn't receive an image
          <View>
            <Text>No book image</Text>
          </View>
        )}
      </View>

      {/* 
      Rightside of the details container
      it uses the bookSubdetail component to display some book details
      */}
      <View style={styles.bookDeatilsContainer}>
        <BookSubdetail //Author
          icon={<FontAwesome5 name={"signature"} size={18} />}
          text={author}
        />
        <BookSubdetail //Date
          icon={<Fontisto name={"date"} size={18} />}
          text={getFotmattedDate(date)}
        />
        <BookSubdetail //Genre
          icon={<Entypo name={"tag"} size={18} />}
          text={genre}
        />
        <BookSubdetail //ISBN
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
