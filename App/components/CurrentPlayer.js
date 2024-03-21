import { Text, View } from "react-native";

export function CurrentPlayer({ currentPlayer }) {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        backgroundColor: currentPlayer.bgColor,
        padding: 10,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Jogando: {currentPlayer.name}
      </Text>
    </View>
  );
}
