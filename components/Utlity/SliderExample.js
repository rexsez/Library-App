import { Slider } from "@miblanchard/react-native-slider";
import { StyleSheet, View, Text } from "react-native";

// This is basically a scale slider
// value is used to show the initial value
// minimumValue is used to decide the lowest value of the scale (the one to the far left)
// which is 0 in our case since a book can't have negative rating
// maximumValue is used to decide the highest value of the scale (the one to the far right)
// which is 5 in our case
// onSlidingComplete is a function that is activated once the slider "FINISHES" moving, meaning
// not at any point in the middle, only when it stops moving
// step is used to decide by how much the scale is able to change
// in our case it's 0.5 so the scale can start from 0, and the very next point will be 0.5 then 1 and so on
// This component is developed by the react community, check the link below for reference:
// https://github.com/miblanchard/react-native-slider
function SliderExample({ rating, setRating }) {
  function changeValue(enteredValue) {
    setRating(enteredValue);
  }

  return (
    <View style={styles.container}>
      <Slider
        value={rating}
        minimumValue={0}
        maximumValue={5}
        onSlidingComplete={(value) => changeValue(value)}
        step={0.5}
      />
      <Text>Value: {rating}</Text>
    </View>
  );
}

export default SliderExample;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
