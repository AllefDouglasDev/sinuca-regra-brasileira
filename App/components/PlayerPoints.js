import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useConfig } from "../hooks/useConfig";

export const PlayerPoints = ({ players, diff, playerWinning }) => {
  const { isBigScoreEnabled } = useConfig()
  const [visible, setVisible] = useState(false);

  if (!isBigScoreEnabled) return null

  return (
    <View style={{ width: "100%", marginBottom: 10, gap: 10 }}>
      <Pressable
        onPress={() => setVisible((prev) => !prev)}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          borderColor: "#cecece",
          borderWidth: 1,
        }}
      >
        <Text>{visible ? "Esconder pontuação" : "Mostrar pontuação"}</Text>
      </Pressable>
      {visible && (
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
            {players.map((player) => (
              <View
                key={player.id}
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "40%",
                  height: 100,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    padding: 0,
                    fontSize: 90,
                      lineHeight: 105,
                    fontWeight: "bold",
                    color: player.bgColor,
                  }}
                >
                  {player.points}
                </Text>
              </View>
            ))}
          </View>
          {players.length === 2 && (
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 5,
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 100,
                  fontWeight: "bold",
                  color: diff > 0 ? playerWinning.bgColor : "black",
                }}
              >
                {diff > 0 ? diff : "-"}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
