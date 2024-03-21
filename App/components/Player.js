import { Text, TouchableOpacity, View } from "react-native";
import { useConfig } from "../hooks/useConfig";

export function Player({
  player,
  playerWinning,
  diff,
  leftDiff,
  rightDiff,
  showSingleDiff = true,
  fullSize,
  playing,
  onPress,
  onFall,
  onLongPress,
}) {
  const { isPlayerDiffEnabled } = useConfig()

  return (
    <View style={{ flex: 1, minWidth: fullSize ? "100%" : undefined, gap: 10 }}>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <View
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 5,
            backgroundColor: player.bgColor,
            opacity: isPlayerDiffEnabled && !playing ? 0.5 : 1,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "white",
              paddingBottom: 10,
            }}
          >
            {player.name}
          </Text>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Pontos: {player.points}
          </Text>
          {showSingleDiff ? (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                paddingTop: 10,
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: "white",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {playerWinning.id === player.id && diff > 0 ? diff : "-"}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10,
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: "white",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 5,
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: leftDiff.color,
                  }}
                >
                  {leftDiff.value > 0 ? leftDiff.value : "-"}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 5,
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: rightDiff.color,
                  }}
                >
                  {rightDiff.value > 0 ? rightDiff.value : "-"}
                </Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 5,
          backgroundColor: player.bgColor,
        }}
        onPress={onFall}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "semibold",
            color: "white",
          }}
        >
          +7 Pontos
        </Text>
      </TouchableOpacity>
    </View>
  );
}
