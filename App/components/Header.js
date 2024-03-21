import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Header = ({ onBack, onUndo, onReset }) => {
  return (
    <View
      style={{
        width: "100%",
        heigh: 60,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        <TouchableOpacity
          onPress={onBack}
          style={{
            ...styles.button,
            borderColor: "#cecece",
            borderWidth: 1,
          }}
        >
          <Text style={{ color: "black" }}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
