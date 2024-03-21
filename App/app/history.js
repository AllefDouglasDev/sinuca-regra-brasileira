import * as ScreenOrientation from "expo-screen-orientation";
import { ScrollView, Text, View } from "react-native";
import { useHistoryStore } from "../store/history";
import { useCallback, useEffect } from "react";
import { BreakBallsList } from "../components/BreakBallsList";
import { FontAwesome } from "@expo/vector-icons";
import { Separator } from "../components/Separator";

export default function History() {
  const history = useHistoryStore((store) => store.history);
  const currentBreak = useHistoryStore((store) => store.currentBreak);

  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  const renderComponent = useCallback((item, idx) => {
    if (item.type === "fall") {
      return <Fall key={idx} item={item} />;
    }
    if (item.type === "pass-turn" && item.break.length > 0) {
      return <PassTurn key={idx} item={item} />;
    }
    if (item.type === "undo") {
      return <Undo key={idx} item={item} />;
    }
    return null;
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#e8e7d6" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {history.length > 0 ? (
          <View style={{ flex: 1, gap: 10, paddingHorizontal: 10 }}>
            {history.map((item, idx) => renderComponent(item, idx))}
          </View>
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "black",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Nenhuma jogada registrada
            </Text>
          </View>
        )}
      </ScrollView>
      {currentBreak.length > 0 && (
        <View style={{ gap: 10, paddingHorizontal: 10 }}>
          <Separator />
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Jogada atual
          </Text>
          <BreakBallsList breakBalls={currentBreak} showPoints={false} />
        </View>
      )}
    </View>
  );
}

const Fall = ({ item }) => {
  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: item.player.bgColor,
        padding: 10,
      }}
    >
      <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
        Falta: Jogador {item.player.id} | +7 Pontos
      </Text>
    </View>
  );
};

const PassTurn = ({ item }) => {
  return (
    <View style={{ gap: 5, alignItems: "flex-start" }}>
      <Text
        style={{
          textAlign: "center",
          color: item.player.bgColor,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Jogador {item.player.id}
      </Text>
      <BreakBallsList breakBalls={item.break} showPoints={false} />
    </View>
  );
};

const Undo = ({ item }) => {
  const stateText = useCallback((gameState) => {
    if (gameState === "risking") {
      return "Arriscando";
    }
    if (gameState === "free") {
      return "Bola livre de falta";
    }
    return "Jogue apenas na bola da vez";
  }, []);

  const renderComponent = useCallback(
    (item) => {
      if (item.type === "add-ball") {
        return (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text
              style={{
                color: item.player.bgColor,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Jogador: {item.player.id}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              | Estado: {stateText(item.state)}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              | Bola: {item.ball.points}
            </Text>
          </View>
        );
      }
      if (item.type === "fall") {
        return (
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text
              style={{
                color: item.player.bgColor,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Jogador {item.player.id}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              | -7 Pontos
            </Text>
          </View>
        );
      }
      return null;
    },
    [stateText]
  );

  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: "#baa16a",
        padding: 10,
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
      }}
    >
      <FontAwesome name="undo" size={20} color="white" />
      <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
        Desfazer:
      </Text>
      {renderComponent(item.play)}
    </View>
  );
};
