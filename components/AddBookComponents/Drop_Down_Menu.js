import { View, StyleSheet, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

/* 
Dropdown component properties:
label: should take a String
style: should take a style object for styling the root container (View)
dropDownConfig: takes dropdown configurations (IMPORTANT to add the value, and onChange) check the link below
elements: should take a list of {label , value} objects
Example: 
    [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' }
    ]

More dropdown configurations can be found in the following link:
https://www.npmjs.com/package/react-native-element-dropdown
*/
function DropDownMenu({ label, labelStyle, style, elements, dropDownConfig }) {
  const data = elements;

  const renderLabel = () => {
    if (dropDownConfig && dropDownConfig.value) {
      return <Text style={[styles.label, labelStyle]}>{label}</Text>;
    }
    return null;
  };

  return (
    <View style={[styles.rootContainer, style]}>
      {renderLabel()}
      <Dropdown
        {...dropDownConfig}
        style={styles.dropdown}
        data={data}
        placeholderStyle={styles.placeholderStyle}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={label}
      />
    </View>
  );
}

export default DropDownMenu;

const styles = StyleSheet.create({
  rootContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  dropdown: {
    height: 45,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "whitesmoke",
  },
  label: {
    fontSize: 8,
    marginBottom: 4,
  },
  placeholderStyle: {
    fontSize: 12,
    fontWeight: "bold"
  },
});
