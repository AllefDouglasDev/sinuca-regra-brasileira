import * as ScreenOrientation from "expo-screen-orientation";
import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { useEffect } from "react";
import { useConfig } from "../hooks/useConfig";

export default function Page() {
  const { isFocusModeEnabled } = useConfig();

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
        <Link push href={isFocusModeEnabled ? "/duo-focus" : "/duo"} asChild>
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
        <Link push href={isFocusModeEnabled ? "/trio-focus" : "/trio"} asChild>
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
        <Link push href="/config" asChild>
          <Pressable
            style={{
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              borderColor: "#cecece",
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Configurações
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
