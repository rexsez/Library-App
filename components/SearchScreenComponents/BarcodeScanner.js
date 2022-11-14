import { View, Text, StyleSheet, Button, Platform, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

import { BOOKS } from "../../data/dummy-data";

function BarcodeScanner({ navigation }) {
  // To track permission of accessing camera
  const [hasPermission, setHasPermission] = useState(null);
  // To track what if something got scanned or no (boolean)
  const [scanned, setScanned] = useState(false);
  // To track the scanned item, which is going to be the ISBN
  const [text, setText] = useState("Not yet scanned");

  // To ask for camera permission
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  // To check if input is valid, ISBN shouldn't contain any letter ot special character
  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // If something is scanned we will update the states declared above
  const handleBardCodeScanned = ({ data }) => {
    // This is needed, because if something is scanned, I need to show scan again button if the platform is IOS
    setScanned(true);
    // ISBN have 13 or 10 digit number (according to my quick googling), so I must ensure that
    // the scanned barcode is 10 or 13 number, and doesn't include anything but numbers
    if (
      (data.length === 13 || data.length === 10) &&
      containsOnlyNumbers(data)
    ) {
      setText(data);
      // Checking if the list of books we have include the scanned barcode, which is needed to decide
      // which page to load, if we have I'll load the book information page. Otherwise, Add book screen should
      // be loaded to give the option to user to add the new book
      // Parse int is needed because we stored the isbn as a number, while the scanner is reading
      // it as a string
      const selectedBook = BOOKS.find((book) => book.isbn === parseInt(data));
      //  If selectedBook is set (not null),it means that there is a book and we should go to book information
      if (selectedBook)
        navigation.navigate("Book", { bookId: data, isScanned: true });
      else navigation.navigate("Add", { bookId: data, isScanned: true });
      // selectedBook not set means there is no book with the scanned ISBN, so we should load Add book screen
    } else {
      setText("Not yet scanned");
      Alert.alert("Invalid Barcode!", "Please Scan Again", [
        {
          text: "Okey",
          onPress: () =>
            // only android will be redirected to Search screen page (Bug in the framework), IOS won't be redirected
            Platform.OS === "android"
              ? navigation.navigate("SearchScreenStack")
              : undefined,
          style: "cancel",
        },
      ]);
    }
  };

  // Check permission and return the screens

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for Camera Permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Text style={{ margin: 10 }}>
          Please Allow Access to camera from the Settings
        </Text>
      </View>
    );
  }

  // Return the view
  return (
    <View style={styles.container}>
      <View style={styles.barcodeContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBardCodeScanned}
          style={{ height: 500, width: 500 }}
        />
      </View>

      <Text style={styles.maintext}> {text}</Text>
      {Platform.OS === "ios" && scanned && (
        <Button
          title="Scan again"
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}
    </View>
  );
}

export default BarcodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  barcodeContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
  },

  maintext: {
    fontSize: 16,
    margin: 20,
  },
});
