import { View, StyleSheet, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

/* 
Dropdown component properties:
label: should take a String
style: should take a style object for styling the root container (View)
dropDownConfig: takes a configuration object for the dropdown component. check link below
elemnts: should take a list of {label , value} objects
Example: 
    [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' }
    ]

More dropdown configurations can be found in the following link:
https://www.npmjs.com/package/react-native-element-dropdown
*/
function DropDownMenu({ label, style, elements, dropDownConfig }) {
//   const [value, setValue] = useState(null);

  const data = elements;

  const renderLabel = () => {
    // if (value) {
      return <Text style={styles.label}>{label}</Text>;
    // }
    // return null;
  };

  return (
    <View style={[styles.rootContainer, style]}>
      {renderLabel()}
      <Dropdown
        {...dropDownConfig}
        style={styles.dropdown}
        data={data}
        // search
        // searchPlaceholder="Search..."
        placeholderStyle={styles.placeholderStyle}
        maxHeight={300}
        labelField="label"
        valueField="value"
        // value={value}
        placeholder={label}
        // onChange={(item) => {
        //   setValue(item.value);
        // }}
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
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  placeholderStyle: {
    fontSize: 12,
  },
});
