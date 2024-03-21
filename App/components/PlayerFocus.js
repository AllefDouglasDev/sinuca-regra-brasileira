import { Pressable, Text, View } from "react-native";

export const PlayerFocus = ({
  currentPlayer,
  player,
  onFallPress,
  onPassTurnPress,
}) => {
  return (
    <View style={{ flex: 1, gap: 10 }}>
      <Pressable
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "white",
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          opacity: currentPlayer.id === player.id ? 1 : 0.3,
        }}
        onPress={() => onPassTurnPress(player.id)}
      >
        <Text
          style={{
            padding: 0,
            fontSize: 130,
            lineHeight: 160,
            fontWeight: "bold",
            color: player.bgColor,
          }}
        >
          {player.points}
        </Text>
      </Pressable>
      <Pressable
        style={{
          borderRadius: 5,
          backgroundColor: player.bgColor,
          padding: 5,
        }}
        onPress={() => onFallPress(player.id)}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          +7 Pontos
        </Text>
      </Pressable>
    </View>
  );
};
