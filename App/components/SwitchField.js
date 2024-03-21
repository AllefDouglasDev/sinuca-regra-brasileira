import { Switch, Text, View } from "react-native";

export const SwitchField = ({ isEnabled, onValueChange, children }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{children}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "white" }}
        thumbColor={isEnabled ? "#04635f" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={isEnabled}
      />
    </View>
  );
};
