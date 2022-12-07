import { View, Text, TextInput, StyleSheet } from "react-native";

function Input({ label, style, textInputConfig, invalid }) {
  const inputStyles = [styles.input];

  //to use the multiline style (if multiline is used)
  if (textInputConfig && textInputConfig.multiline) {
    //if there are configs AND there's multiline
    inputStyles.push(styles.inputMultiline);
    //we push the style of multiline to the inputStyles variable
    //then we use this variable in the style of the input tag
  }

  //if the input is invalid, it pushes the invalid style to inputStyles (e.g. red border etc...)
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      {/* the container is more configurable this way (takes additional styles from style parameter) */}

      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      
        {/* 
            TextInputConfig is taken from the parameter to control how this input field behaves
            E.g. Keyboard Type, AutoCorrect, etc...
            check: https://reactnative.dev/docs/textinput for the available TextInput props
        */}
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 2,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    backgroundColor: "whitesmoke"
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: "red",
  },
});
