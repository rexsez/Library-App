import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import MyButton from "../MyButton";
import { formateDate, dueDateToDays } from "../Utility/UtilityFunctions";
function BorrowedBookCard({ bookData, dueDate }) {
  const navigation = useNavigation();
  function onPress() {
    // Note: here im just getting bookData and spreading it varabiles into
    // new object, so if this object is change, the original one doesnt change
    // Avoiding coupling them togather
    navigation.navigate("StackBook", { bookId: bookData.isbn });
  }
  function renderBadge() {
    if (bookData.badge.length == 3)
      return (
        <View style={styles.badgeContainer}>
          <MaterialCommunityIcons
            style={[
              styles.badgeStyle,
              {
                paddingTop: bookData.badge[0][2],
                backgroundColor: bookData.badge[0][3],
                borderColor: bookData.badge[0][4],
              },
            ]}
            name={bookData.badge[0][0]}
            size={20}
            color={bookData.badge[0][1]}
          />
          <MaterialCommunityIcons
            style={[
              styles.badgeStyle,
              {
                paddingTop: bookData.badge[1][2],
                backgroundColor: bookData.badge[1][3],
                borderColor: bookData.badge[1][4],
              },
            ]}
            name={bookData.badge[1][0]}
            size={20}
            color={bookData.badge[1][1]}
          />
          <MaterialCommunityIcons
            style={[
              styles.badgeStyle,
              {
                paddingTop: bookData.badge[2][2],
                backgroundColor: bookData.badge[2][3],
                borderColor: bookData.badge[2][4],
              },
            ]}
            name={bookData.badge[2][0]}
            size={20}
            color={bookData.badge[2][1]}
          />
        </View>
      );
    else if (bookData.badge.length == 2)
      return (
        <View style={styles.badgeContainer}>
          <MaterialCommunityIcons
            style={[
              styles.badgeStyle,
              {
                paddingTop: bookData.badge[0][2],
                backgroundColor: bookData.badge[0][3],
                borderColor: bookData.badge[0][4],
              },
            ]}
            name={bookData.badge[0][0]}
            size={20}
            color={bookData.badge[0][1]}
          />
          <MaterialCommunityIcons
            style={[
              styles.badgeStyle,
              {
                paddingTop: bookData.badge[1][2],
                backgroundColor: bookData.badge[1][3],
                borderColor: bookData.badge[1][4],
              },
            ]}
            name={bookData.badge[1][0]}
            size={20}
            color={bookData.badge[1][1]}
          />
        </View>
      );
    else if (bookData.badge.length == 1)
      return (
        <View style={styles.badgeContainer}>
          <MaterialCommunityIcons
            style={[
              styles.badgeStyle,
              {
                paddingTop: bookData.badge[0][2],
                backgroundColor: bookData.badge[0][3],
                borderColor: bookData.badge[0][4],
              },
            ]}
            name={bookData.badge[0][0]}
            size={20}
            color={bookData.badge[0][1]}
          />
        </View>
      );
  }

  return (
    <View style={styles.Container}>
      {/* ----------------------Image container ------------------- */}
      <View style={styles.ImageContainer}>
        <Image
          style={styles.Image}
          source={{
            uri: bookData.imageUrl,
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
            <Text style={styles.Text}>
              {"publish " + formateDate(bookData.date)}
            </Text>
          </View>
          <View style={styles.TextContainer}>
            {/* Function defined in utlity */}
            <Text style={styles.Text}>{"due date " + dueDate}</Text>
          </View>
          <View style={styles.TextContainer}>
            {/* Function defined in utlity */}
            <Text
              style={[
                dueDateToDays(dueDate).charAt(
                  dueDateToDays(dueDate).length - 1
                ) == "."
                  ? styles.GreenText
                  : null,
                dueDateToDays(dueDate) == "pending" ? styles.YellowText : null,
                dueDateToDays(dueDate).charAt(
                  dueDateToDays(dueDate).length - 1
                ) == "!"
                  ? styles.RedText
                  : null,
              ]}
            >
              {dueDateToDays(dueDate)}
            </Text>
          </View>
        </View>
      </View>
      {/* --------------------------------------------------------- */}
      {/* ----------------------Share icon container ------------------- */}
      <View style={styles.ShareIconContainer}>
        {/* <Ionicons name="share-social-outline" size={24} color="blue"></Ionicons> */}
        <View>{renderBadge()}</View>
        <Text style={styles.ratingStyle}>
          {bookData.rating != -1 ? bookData.rating : "Unrated"}
        </Text>
      </View>
    </View>
  );
}
export default BorrowedBookCard;
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
  ratingStyle: {
    fontSize: 12,
    color: "gray",
    paddingVertical: 20,
  },
  GreenText: {
    fontSize: 12,
    color: "green",
  },
  RedText: {
    fontSize: 12,
    color: "red",
  },
  YellowText: {
    fontSize: 12,
    color: "orange",
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeStyle: {
    marginHorizontal: 3,
    borderRadius: 30,
    borderWidth: 1.5,
    paddingLeft: 3,
  },
});
