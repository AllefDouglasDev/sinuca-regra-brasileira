import { Pressable, Text, View } from "react-native";

export const PlayerFocus = ({
  currentPlayer,
  player,
  onFallPress,
  onPassTurnPress,
  onLongPress,
}) => {
  return (
    <View className="flex-1 gap-2 px-2">
      <Pressable
        style={{
          flex: 1,
          height: "100%",
          backgroundColor: "white",
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          opacity: currentPlayer.id === player.id ? 1 : 0.3,
          position: "relative",
        }}
        onPress={() => onPassTurnPress(player.id)}
        onLongPress={onLongPress}
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
        <Text
          style={{
            top: 2,
            left: 5,
            position: "absolute",
            fontWeight: "bold",
            color: player.bgColor,
            fontSize: 18,
          }}
          numberOfLines={1}
        >
          {player.name}
        </Text>
      </Pressable>
      <Pressable
        style={{
          borderRadius: 5,
          backgroundColor: player.bgColor,
          paddingVertical: 10,
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
