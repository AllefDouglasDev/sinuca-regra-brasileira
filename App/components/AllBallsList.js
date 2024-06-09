import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ball } from "./Ball";
import { useCallback, useEffect, useState } from "react";

function useBallSize() {
  const { width, height } = Dimensions.get("screen");
  const size = Math.max(width, height);
  const [ballSize, setBallSize] = useState(size / 7);

  const loadInitialBallSize = useCallback(async () => {
    const storedBallSize = await AsyncStorage.getItem("ball-size");
    setBallSize(storedBallSize ? parseInt(storedBallSize) : size / 7);
  }, []);

  const handleChangeBallSize = useCallback(async (ballSize) => {
    setBallSize(ballSize);
    await AsyncStorage.setItem("ball-size", ballSize.toString());
  }, []);

  useEffect(() => {
    loadInitialBallSize();
  }, [loadInitialBallSize]);

  return { ballSize, handleChangeBallSize };
}

export function AllBallsList({ allBalls, availableBalls, onPressBall }) {
  const { ballSize, handleChangeBallSize } = useBallSize();

  const isBallAvailable = (ball) => {
    return availableBalls.includes(ball);
  };

  useEffect(() => { }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      <View className="h-full flex-row overflow-hidden">
        <View className="mt-2 ml-4">
          <TouchableOpacity
            className="items-center justify-center border border-zinc-800 rounded p-2 mb-1 min-w-[40px]"
            onPress={() => handleChangeBallSize(ballSize + 10)}
          >
            <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center justify-center border border-zinc-800 rounded p-2 min-w-[40px]"
            onPress={() => handleChangeBallSize(ballSize - 10)}
          >
            <AntDesign name="minus" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {allBalls.map((ball) => (
          <TouchableOpacity
            key={ball.points}
            onPress={() => onPressBall(ball)}
            disabled={!isBallAvailable(ball)}
            style={{
              opacity: isBallAvailable(ball) ? 1 : 0.3,
            }}
          >
            <Ball ball={ball} size={ballSize} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
