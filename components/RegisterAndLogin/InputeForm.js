import { TextInput, View, StyleSheet, Text } from "react-native";

function InputeForm({ inputeTextProps, onChangeTextHandler, style }) {
  return (

    <View style={styles.Container}>
      <TextInput
        onChangeText={onChangeTextHandler}
        selectionColor={"#063663"}
        
        style={[styles.TextInpute, style]}
        {...inputeTextProps}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({

  Container: {
    backgroundColor: "white",
    borderRadius: 20,
    margin: 10,
    padding: 5,
    paddingTop: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 10,
    borderStyle: "solid",
    // borderWidth:3,
    borderBottomWidth: 3,
    borderColor: "#144c84",

  },
  TextInpute: {
    marginBottom: 5,
    marginLeft: 7,
    borderColor: "black",
    borderRadius: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  ImageBackground: {
    flex: 1,
  },

});
export default InputeForm;