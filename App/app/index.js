import * as ScreenOrientation from "expo-screen-orientation";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "../components/StatusBar";

export default function Page() {
  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  return (
    <View className="flex-1 bg-teal-600">
      <StatusBar />
      <View className="flex-1 items-center justify-center">
        <Link push href={"/duo-focus"} asChild>
          <Pressable className="p-5 rounded-xl bg-[#0e6aae] mb-3">
            <Text className="text-white text-xl font-bold">Dois jogadores</Text>
          </Pressable>
        </Link>
        <Link push href={"/trio-focus"} asChild>
          <Pressable className="p-5 rounded-xl bg-[#04635f]">
            <Text className="text-white text-xl font-bold">Três jogadores</Text>
          </Pressable>
        </Link>
      </View>
      <View className="items-center justify-center pb-2">
        <Text className="text-sm font-semibold">
          © Copyright - Allef Douglas
        </Text>
        <Text className="text-xs font-semibold">
          (allef.douglas.dev@gmail.com)
        </Text>
      </View>
    </View>
  );
}
