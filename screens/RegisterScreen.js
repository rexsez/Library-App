import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { ImageBackground, View, StyleSheet, SafeAreaView } from "react-native";

import RegisterForm from "../components/RegisterAndLogin/RegisterForm";

function RegisterScreen() {
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Container}>
        <ImageBackground
          style={styles.ImageBackground}
          source={require("../assets/logoNew2.png")}
          resizeMode="cover"
        >
          <View style={styles.RegistrationCOntainer}>
            <RegisterForm></RegisterForm>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  ImageBackground: {
    flex: 1,
  },
  RegistrationCOntainer: {
    flex: 1,
  },
});
export default RegisterScreen;
