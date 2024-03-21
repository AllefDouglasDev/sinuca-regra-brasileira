import { Text, View } from "react-native";
import { Ball } from "./Ball";
import { useMemo } from "react";

export function CurrentBall({ lowerBall, gameState }) {
  const stateText = useMemo(() => {
    if (gameState === "risking") {
      return "Arriscando";
    }
    if (gameState === "free") {
      return "Bola livre de falta";
    }
    return "Jogue apenas na bola da vez";
  }, [gameState]);

  return lowerBall ? (
    <View style={{ gap: 10, marginVertical: 30, alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Bola da vez</Text>
      <Ball ball={lowerBall} />
      <Text>{stateText}</Text>
    </View>
  ) : (
    <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>
      Fim de jogo
    </Text>
  );
}
