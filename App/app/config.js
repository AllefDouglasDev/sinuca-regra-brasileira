import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Separator } from "../components/Separator";
import { SwitchField } from "../components/SwitchField";
import { useConfig } from "../hooks/useConfig";

export default function Config() {
  const {
    isPlayerDiffEnabled,
    isBigScoreEnabled,
    isFocusModeEnabled,
    togglePlayerDiff,
    toggleBigScore,
    toggleFocusMode,
  } = useConfig();

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e8e7d6" }}>
      <StatusBar style="auto" />
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={handleBack}
          style={{
            width: 100,
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            borderColor: "#cecece",
            borderWidth: 1,
          }}
        >
          <Text style={{ color: "black" }}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <Separator marginBottom={0} marginTop={0} />
      <View style={{ paddingHorizontal: 10 }}>
        <SwitchField
          isEnabled={isPlayerDiffEnabled}
          onValueChange={togglePlayerDiff}
        >
          Diferenciar jogadores ativos:
        </SwitchField>
        <SwitchField
          isEnabled={isBigScoreEnabled}
          onValueChange={toggleBigScore}
        >
          Mostrar placar grande:
        </SwitchField>
        <SwitchField
          isEnabled={isFocusModeEnabled}
          onValueChange={toggleFocusMode}
        >
          Modo foco:
        </SwitchField>
      </View>
    </View>
  );
}
