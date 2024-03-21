import { View } from "react-native";

export function Separator({ marginTop = 10, marginBottom = 10 }) {
  return (
    <View
      style={{
        width: "100%",
        height: 1,
        flexDirection: "row",
        marginTop,
        marginBottom,
        backgroundColor: "gray",
        opacity: 0.5,
      }}
    />
  );
}
