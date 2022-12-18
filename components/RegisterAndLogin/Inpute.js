import { TextInput, View, StyleSheet } from "react-native";

function Inpute({ inputeTextProps, onChangeTextHandler, style, size }) {
  return (
    <View style={[styles.Container, size]}>
      <TextInput
        onChangeText={onChangeTextHandler}
        selectionColor={"black"}
        style={[styles.TextInpute, style]}
        {...inputeTextProps}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    marginHorizontal: "12%",
    marginBottom: 20,
  },
  TextInpute: {
    borderBottomWidth: 2,
    borderColor: "#FFA920",
    color: "white  ",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default Inpute;
