import { Text, View } from "react-native";

function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 26,
          fontWeight: "bold",
        }}
      >
        Home Screen
      </Text>
    </View>
  );
}

export default HomeScreen;
