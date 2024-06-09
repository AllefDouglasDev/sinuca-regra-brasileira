import { MaterialIcons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export const DuoResult = ({
  diff,
  playerWinning,
  onUndo,
  onReset,
  onHistory,
}) => {
  return (
    <View className="flex-1 h-full">
      <View
        className="flex-1 h-full bg-white rounded-md items-center justify-center mb-2"
        style={{ backgroundColor: diff > 0 ? playerWinning.bgColor : "white" }}
      >
        <Text
          className="p-0 text-[130px]"
          style={{
            lineHeight: 147,
            color: diff > 0 ? "white" : "black",
          }}
        >
          {diff > 0 ? diff : "="}
        </Text>
      </View>
      <View className="flex-row gap-2.5">
        <Pressable
          className="flex-1 h-[46px] items-center justify-center rounded-md border border-zinc-800"
          onPress={onUndo}
        >
          <MaterialIcons name="undo" size={24} color="black" />
        </Pressable>
        <Pressable
          className="flex-1 h-[46px] items-center justify-center rounded-md border border-zinc-800"
          onPress={onReset}
        >
          <FontAwesome name="undo" size={24} color="black" />
        </Pressable>
        <Pressable
          className="flex-1 h-[46px] items-center justify-center rounded-md border border-zinc-800"
          onPress={onHistory}
        >
          <FontAwesome6 name="newspaper" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};
