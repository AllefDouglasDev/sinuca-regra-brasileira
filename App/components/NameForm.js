import { useEffect, useState } from "react";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";

export const NameForm = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name) return;
    onConfirm(name);
    setName("");
  };

  const handleClose = () => {
    onClose();
    setName("");
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (!isOpen) {
      Keyboard.dismiss();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <View
      style={{
        zIndex: 999,
        position: "absolute",
        top: 0,
        left: 0,
        width: isOpen ? "100%" : 0,
        height: isOpen ? "100%" : 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: isOpen ? "flex" : "none",
      }}
    >
      <View
        style={{
          gap: 10,
          padding: 20,
          backgroundColor: "white",
          borderRadius: 5,
          width: "80%",
        }}
      >
        <Text>Nome:</Text>
        <TextInput
          autoFocus
          value={name}
          onChangeText={setName}
          style={{
            borderColor: "#cecece",
            borderWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            height: 40,
          }}
        />

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            style={{
              flex: 1,
              borderColor: "#cecece",
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}
            onPress={handleClose}
          >
            <Text
              style={{ color: "black", fontWeight: "semibold", fontSize: 16 }}
            >
              Cancelar
            </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              borderColor: "#cecece",
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{ color: "black", fontWeight: "semibold", fontSize: 16 }}
            >
              Ok
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
