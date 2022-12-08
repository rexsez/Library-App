import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { useContext, useState } from "react";
import { StudentContext } from "../store/StudentContext";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import BookCard from "../components/SearchScreenComponents/BookCard";
import Card from "../components/Utility/Cards/Card";
import { AppContext } from "../store/AppContext";
function ProfileScreen({ defaultScreen }) {
  const appCtx = useContext(AppContext);
  const route = useRoute();
  useFocusEffect(() => {
    if (!!route.params?.defaultScreen) {
      setList("fav");
      navigation.navigate("DrawerProfile");
    }
  });
  function renderItem(book) {
    if (currentList == "fav") {
      const favoriteBook = appCtx.books.find(
        (bookss) => bookss.isbn === book.item
      );

      return <BookCard bookData={favoriteBook}></BookCard>;
    } else {
      const borrowedBook = appCtx.books.find(
        (bookss) => bookss.isbn === book.item
      );
      return <BookCard bookData={borrowedBook}></BookCard>;
    }
  }
  function keyExtractor(book) {
    return book.item;
  }
  function whichList() {
    if (currentList === "fav") {
      return studentContext.student.favBooks;
    } else {
      return Object.keys(studentContext.student.borrowedBooks);
    }
  }
  const [currentList, setList] = useState("fav");
  const navigation = useNavigation();
  const studentContext = useContext(StudentContext);

  // Checking if you have logged in / registered already
  // If you have logged in, then u can view ur profile
  // -----------------------------------------------
  // useFocusEffect runs every time the screen is focused,
  // This means that whenever u click on profile it will check
  // if student has logged in --> he has put his email
  // --------------------------------------------
  // "!!" turns an empty string into false,
  //  "!" the third one is just so if it is empty --> false
  //  it will become !false --> true
  useFocusEffect(() => {
    if (!!!studentContext.student.Email) {
      navigation.navigate("StackRegister");
    }
  });
  // change continue

  if (!!studentContext.student.Email) {
    return (
      <View style={styles.container}>
        <View style={styles.outerListContainer}>
          <View style={styles.iconContainer}>
            <Pressable style={({ pressed }) => [pressed && styles.pressed]}>
              <Card
                onPressed={setList.bind(this, "fav")}
                path="star"
                color="rgb(130, 196, 217)"
              ></Card>
            </Pressable>
            <Pressable style={({ pressed }) => [pressed && styles.pressed]}>
              <Card
                onPressed={setList.bind(this, "bor")}
                path="book"
                color="rgb(130, 196, 217)"
              ></Card>
            </Pressable>
          </View>

          <View style={styles.flatListContainer}>
            <FlatList
              data={whichList()}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={styles.ImageBackground}
            ></FlatList>
          </View>
        </View>
      </View>
    );
  }
  // If you are not logged in, it will redirect u
  // To register screen, u can also move to login from there
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outerListContainer: {
    margin: 10,
    marginTop: 0,
    flex: 1,
  },
  iconContainer: {
    margin: 20,
    marginHorizontal: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  flatListContainer: {
    flex: 1,
  },
  ImageBackground: {
    flex: 1,
  },
  pressed: {
    opacity: 0.2,
  },
});
export default ProfileScreen;