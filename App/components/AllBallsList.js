import { TouchableOpacity, View } from "react-native";
import { Ball } from "./Ball";

export function AllBallsList({ allBalls, availableBalls, onPressBall }) {
  const isBallAvailable = (ball) => {
    return availableBalls.includes(ball);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {allBalls.map((ball) => (
        <TouchableOpacity
          key={ball.points}
          onPress={() => onPressBall(ball)}
          disabled={!isBallAvailable(ball)}
          style={{
            opacity: isBallAvailable(ball) ? 1 : 0.3,
          }}
        >
          <Ball ball={ball} size={115} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
