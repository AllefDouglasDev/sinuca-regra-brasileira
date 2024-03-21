import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import { Alert, View, Text, Pressable } from "react-native";
import { Game } from "../components/game";
import { useEffect, useMemo, useState } from "react";
import { AllBallsList } from "../components/AllBallsList";
import { Separator } from "../components/Separator";
import { PlayerFocus } from "../components/PlayerFocus";

const game = new Game();

export default function TrioFocus() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  const { player1, player2, player3, currentPlayer, allBalls, availableBalls } =
    useMemo(() => {
      return {
        allBalls: game.getAllBalls(),
        currentPlayer: game.getCurrentPlayer(),
        availableBalls: game.getPossibleBalls(),
        player1: game.player1,
        player2: game.player2,
        player3: game.player3,
      };
    }, [lastUpdate]);

  const handlePassTurn = (playerId) => {
    if (currentPlayer.id === playerId) {
      return;
    }
    game.passTurn(playerId);
    setLastUpdate(Date.now());
  };

  const handleFall = (playerId) => {
    game.fall(playerId);
    if (currentPlayer.id !== playerId) {
      game.passTurn(playerId);
    }
    setLastUpdate(Date.now());
  };

  const handlePressBall = (ball) => {
    game.addBallToBreak(ball.points);
    setLastUpdate(Date.now());
  };

  const handleReset = () => {
    Alert.alert("Atenção", "Reiniciar o jogo?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          game.reset();
          setLastUpdate(Date.now());
        },
      },
    ]);
  };

  const handleUndo = () => {
    Alert.alert("Atenção", "Desfazer ultima jogada?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          game.undo();
          setLastUpdate(Date.now());
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e8e7d6" }}>
      <StatusBar style="auto" />
      <Separator marginTop={0} marginBottom={0} />
      <View
        style={{
          flex: 1,
          gap: 10,
          flexDirection: "row",
          height: "100%",
          padding: 10,
        }}
      >
        <PlayerFocus
          currentPlayer={currentPlayer}
          player={player1}
          onFallPress={handleFall}
          onPassTurnPress={handlePassTurn}
        />
        <PlayerFocus
          currentPlayer={currentPlayer}
          player={player2}
          onFallPress={handleFall}
          onPassTurnPress={handlePassTurn}
        />
        <PlayerFocus
          currentPlayer={currentPlayer}
          player={player3}
          onFallPress={handleFall}
          onPassTurnPress={handlePassTurn}
        />
      </View>
      <Separator marginTop={0} />
      <View
        style={{
          width: "100%",
          gap: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Pressable
          onPress={handleUndo}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            backgroundColor: "#baa16a",
          }}
        >
          <Text style={{ color: "white" }}>Desfazer</Text>
        </Pressable>
        <AllBallsList
          allBalls={allBalls}
          availableBalls={availableBalls}
          onPressBall={handlePressBall}
        />
        <Pressable
          onPress={handleReset}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            backgroundColor: "#04635f",
          }}
        >
          <Text style={{ color: "white" }}>Reiniciar</Text>
        </Pressable>
      </View>
    </View>
  );
}
