import { TextInput, View, StyleSheet } from "react-native";
function Inpute({ inputeTextProps, onChangeTextHandler, style }) {
  return (
    <View style={styles.Container}>
      <TextInput
        onChangeText={onChangeTextHandler}
        selectionColor={"#FFA920"}
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
