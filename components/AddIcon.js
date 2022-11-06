import Ionicons from "@expo/vector-icons/Ionicons";

import { View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { StyleSheet } from "react-native";

export default function AddIcon({ name, color, size, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? styles.pressed : null)}
    >
      <View style={styles.icon}>
        <Ionicons name={name} size={size} color={color}></Ionicons>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  icon: {
    padding: 10,
    marginBottom: 2,
    marginTop: 10,
    marginRight: 4,
  },
});
