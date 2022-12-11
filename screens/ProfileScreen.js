import { View, StyleSheet, FlatList, Pressable,ImageBackground,StatusBar } from "react-native";
import { useContext, useState } from "react";
import { StudentContext } from "../store/StudentContext";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import BookCard from "../components/SearchScreenComponents/BookCard";
import BorrowedBookCard from "../components/ProfileScreenComponents/BorrowedBookCard";
import CardBorrow_Fav from "../components/Utility/Cards/CardBorrow_Fav";
import {dueDateSort} from "../components/Utility/UtilityFunctions";
import {getStudentID, putVerification} from "../components/Utility/http";
import { AppContext } from "../store/AppContext";
import { Text } from "react-native-paper";
import { set } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      return <BorrowedBookCard bookData={borrowedBook} dueDate = {studentContext.student.borrowedBooks[book.item]}></BorrowedBookCard>;
    }
  }
  function keyExtractor(book) {
    return book.item;
  }
  // changed_abdullah
  const [description, setDescription] = useState("Your favorite List");
  // end changed
  function whichList() {
    if (currentList === "fav") {
      return studentContext.student.favBooks;
    } else {
      if (!!!studentContext.student.borrowedBooks) {
        return [];
      }
      // changed_abdullah
      // setDescription("Your list of borrowed books");
       if (!!Object.keys(studentContext.student.borrowedBooks)) {
      var currentKey = Object.keys(studentContext.student.borrowedBooks);
      var currentDictionary = []; 
         for (var i = 0; i < currentKey.length; i++) { 
           currentDictionary.push([currentKey[i],studentContext.student.borrowedBooks[currentKey[i]]]);
         }
         currentDictionary.sort(dueDateSort);
         for (var i = 0; i < currentDictionary.length; i++) { 
          currentKey[i] = currentDictionary[i][0];
        }
        return currentKey;
       }
      return [];
      // end changed
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
  const onPressIcon = (type) => {
    if (type == "fav") {
      if (!!studentContext.student?.favBooks) {
        setDescription("Your Favorite List of Books");
      } else {
        setDescription("Your Favorite List is Empty!");
      }
      setList("fav");
    } else {
      if (!!studentContext.student?.borrowedBooks) {
        setDescription("Books You Have Borrowed");
      } else {
        setDescription("You Haven't Borrowed Any Books Yet!");
      }

      setList("bor");
    }
  };

  if (!!studentContext.student.Email) {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.ImageBackground}
          source={require("../assets/logoNew2.png")}
          resizeMode="cover"
        >
        <StatusBar animated={false}
          backgroundColor="whitesmoke"
        ></StatusBar>
        <View style={styles.outerListContainer}>
          <View style={styles.greetingsContainer}>
            <Text style={styles.greetings}>Profile</Text>
          </View>
          <Text style={styles.name}>
            {studentContext.student.FName + " " + studentContext.student.LName}
          </Text>

          <View style={styles.iconContainer}>


            <Pressable style={[currentList == "fav" && styles.pressed]}>

              <CardBorrow_Fav
                onPressed={onPressIcon.bind(this, "fav")}
                path="star"
                // color="rgb(130, 196, 217)"
              ></CardBorrow_Fav>

            </Pressable>
            {/* changed_abdullah */}
            <Pressable style={[currentList == "bor" && styles.pressed]}>
              {/* end changed */}
              <CardBorrow_Fav
                onPressed={onPressIcon.bind(this, "bor")}
                path="book"
                // color="rgb(130, 196, 217)"
              ></CardBorrow_Fav>
            </Pressable>
          </View>
          <View>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.flatListContainer}>
          <View style={styles.badgeContainer}>
        <View style={{flexDirection:"row",flex:1}}><MaterialCommunityIcons style={[styles.badgeStyle,{marginLeft:25,paddingTop:0,backgroundColor:"yellow",borderColor:"grey",}]} name={"fire"} size={15} color = {"red"}/><Text style={{fontSize:10,color:"grey",textAlign:"center",paddingTop:3,fontWeight:"bold"}}> Highly Rated</Text></View>
        <View style={{flexDirection:"row",flex:1}}><MaterialCommunityIcons  style={[styles.badgeStyle,{paddingTop:0,backgroundColor:"lightblue",borderColor:"grey",}]} name={"podium-gold"} size={15} color = {"purple"}/><Text style={{fontSize:10,color:"grey",textAlign:"center",paddingTop:3,fontWeight:"bold"}}> Highly Borrowed</Text></View>
        <View style={{flexDirection:"row",flex:1}}><MaterialCommunityIcons  style={[styles.badgeStyle,{paddingTop:3,backgroundColor:"#1c1c1c",borderColor:"lightgrey",}]} name={"new-box"} size={15} color = {"lightgreen"}/><Text style={{fontSize:10,color:"grey",textAlign:"center",paddingTop:3,fontWeight:"bold"}}> Newly Added</Text></View>
      </View>
            <FlatList
              data={whichList()}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={styles.ImageBackground}
            ></FlatList>
          </View>
        </View>
        </ImageBackground>
      </View>
    );
  }
  // If you are not logged in, it will redirect u
  // To register screen, u can also move to login from there
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal:10,
    marginVertical: 25,
    borderWidth: 3,
    borderColor: 'black',
  },
  outerListContainer: {
    backgroundColor: 'white',
    margin: 10,
    marginTop: 10,
    flex: 1,
  },
  iconContainer: {
    margin: 20,
    marginTop: 10,
    marginHorizontal: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
  },
  ImageBackground: {
    flex: 1,
  },
  pressed: {
    opacity: 0.5,
  },
  greetingsContainer: {

    alignItems: "center",
    marginTop: 30,
    backgroundColor: '#0593bb',
    width: '100%',
    height: 45,

  },
  greetings: {
    marginTop: 5,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',

  },
  name: {
    color: '#144c84',
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 22,
    textAlign: "center",
    color: '#144c84',
    fontWeight: '300',

  },
  badgeContainer: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "center",
    borderBottomWidth:1,
    },
    badgeStyle: {
      marginHorizontal:3,
      borderRadius:30,
      borderWidth:1.5,
      paddingLeft:3,
      },
});
export default ProfileScreen;
