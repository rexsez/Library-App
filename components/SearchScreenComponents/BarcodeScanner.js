import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState();
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  const askForCameraPermission = () => {
    async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    };
  };

  return (
    <View style={styles.container}>
      <Text>Hi this is barcode scanner</Text>
    </View>
  );
}

export default BarcodeScanner;

const styles = StyleSheet.create({
  container: {},
});
