import { Slider } from "@miblanchard/react-native-slider";
import { StyleSheet, View, Text } from "react-native";

// This is basically a scale slider
// minimumValue is used to decide the lowest value of the scale (the one to the far left)
// which is 0 in our case since a book can't have negative rating
//
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
