import { Text, View } from "react-native";
import { Ball } from "./Ball";
import { useMemo } from "react";

export function BreakBallsList({ breakBalls, showPoints = true }) {
  const breakPoints = useMemo(
    () => breakBalls.reduce((acc, curr) => acc + curr.points, 0),
    [breakBalls.length]
  );

  return (
    <View style={{ gap: 4, width: '100%' }}>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 40,
          padding: 10,
          width: "100%",
          backgroundColor: "#04635f",
          borderRadius: 5,
        }}
      >
        {breakBalls.map((ball, index) => (
          <Ball key={index} ball={ball} size={40} />
        ))}
      </View>
      {breakPoints > 0 && showPoints && (
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {breakPoints}
        </Text>
      )}
    </View>
  );
}
