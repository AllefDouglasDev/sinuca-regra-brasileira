import * as ScreenOrientation from "expo-screen-orientation";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#e8e7d6" }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Link push href={"/duo-focus"} asChild>
          <Pressable
            style={{
              backgroundColor: "#0e6aae",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              Dois jogadores
            </Text>
          </Pressable>
        </Link>
        <Link push href={"/trio-focus"} asChild>
          <Pressable
            style={{
              backgroundColor: "#04635f",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              Três jogadores
            </Text>
          </Pressable>
        </Link>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 10,
          gap: 5,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "semibold" }}>
          © Copyright - Allef Douglas
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "semibold" }}>
          (allef.douglas.dev@gmail.com)
        </Text>
      </View>
    </View>
  );
}
