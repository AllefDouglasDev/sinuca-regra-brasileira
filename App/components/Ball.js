import { Image } from "react-native";

export function Ball({ ball, size = 80 }) {
  return (
    <Image
      source={ball.source}
      style={{
        width: size,
        height: size,
        resizeMode: "contain",
      }}
    />
  );
}
