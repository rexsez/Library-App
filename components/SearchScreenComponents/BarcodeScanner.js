import { View, Text, StyleSheet, Button } from "react-native";
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

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // If something is scanned we will update the states declared above
  const handleBardCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    const selectedBook = BOOKS.find((book) => book.isbn === +data);

    if (selectedBook)
      navigation.navigate("Book", { bookId: data, isScanned: true });
    else navigation.navigate("Add", { bookId: data, isScanned: true });
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
          style={{ height: 400, width: 400 }}
        />
      </View>

      <Text style={styles.maintext}> {text}</Text>
      {scanned && (
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
    backgroundColor: "tomato",
  },

  maintext: {
    fontSize: 16,
    margin: 20,
  },
});
