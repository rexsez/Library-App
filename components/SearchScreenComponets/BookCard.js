import {
  View,
  Text,
  StyleSheet,
  Image,
  Share,
  Pressable,
  BackHandler,
} from "react-native";
import BookInformationScreen from "../../screens/Book_Information_Screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import formateDate from "../Utlity/Date";
import MyButton from "../MyButton";
import { useNavigation } from "@react-navigation/native";
function BookCard({ bookData }) {
  const navigation = useNavigation();
  function onPress() {
    // Note: here im just getting bookData and spreading it varabiles into
    // new object, so if this object is change, the original one doesnt change
    // Avoiding coupling them togather
    navigation.navigate("BookInformationScreen", { bookId: bookData.isbn });
  }

  return (
    <View style={styles.Container}>
      {/* ----------------------Image container ------------------- */}
      <View style={styles.ImageContainer}>
        <Image
          style={styles.Image}
          source={{
            uri: "https://static.remove.bg/remove-bg-web/c05ac62d076574fad1fbc81404cd6083e9a4152b/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg ",
          }}
        ></Image>
      </View>
      {/* --------------------------------------------------------- */}
      {/* ----------------------Book details Container ------------------- */}
      <View style={styles.DetialsContainer}>
        <View style={styles.InnerTextContainer}>
          <View style={styles.TextContainer}>
            <MyButton onPress={onPress} Flate={"Flate"}>
              {bookData.title}
            </MyButton>
          </View>
          <View style={styles.TextContainer}>
            <Text style={styles.Text}>{bookData.author}</Text>
          </View>
          <View style={styles.TextContainer}>
            {/* Function defined in utlity */}
            <Text style={styles.Text}>{formateDate(bookData.date)}</Text>
          </View>
        </View>
      </View>
      {/* --------------------------------------------------------- */}
      {/* ----------------------Share icon container ------------------- */}
      <View style={styles.ShareIconContainer}>
        <Ionicons name="share-social-outline" size={24} color="blue"></Ionicons>
      </View>
    </View>
  );
}
export default BookCard;
const styles = StyleSheet.create({
  Image: {
    width: 80,
    height: 100,
  },
  Container: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "#D3D3D3",
  },
  ImageContainer: {
    flex: 2.5,
  },
  DetialsContainer: {
    flex: 6,
  },
  ShareIconContainer: {
    flex: 0.8,
    alignItems: "flex-end",
  },
  InnerTextContainer: {
    flex: 1,
  },
  Title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "blue",
  },
  Text: {
    fontSize: 12,
    color: "gray",
  },
  TextContainer: { flex: 1, marginVertical: 2 },
  onPress: { opacity: 0.75, backgroundColor: "black" },
});
