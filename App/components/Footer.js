import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function Footer({ onPassTurn, onFall, onReset, onUndo }) {
  return (
    <View
      style={{
        width: "100%",
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <TouchableOpacity
        onPress={onPassTurn}
        style={{
          ...styles.button,
          backgroundColor: "#4771b3",
        }}
      >
        <Text style={{ color: "white" }}>Passar a vez</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onFall}
        style={{
          ...styles.button,
          backgroundColor: "#a40b15",
        }}
      >
        <Text style={{ color: "white" }}>Falta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onUndo}
        style={{
          ...styles.button,
          backgroundColor: "#baa16a",
        }}
      >
        <Text style={{ color: "white" }}>Desfazer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onReset}
        style={{ ...styles.button, backgroundColor: "#04635f" }}
      >
        <Text style={{ color: "white" }}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
