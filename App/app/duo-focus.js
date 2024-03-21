import * as ScreenOrientation from "expo-screen-orientation";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Game } from "../components/game";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AllBallsList } from "../components/AllBallsList";
import { Separator } from "../components/Separator";
import { PlayerFocus } from "../components/PlayerFocus";
import { MaterialIcons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useHistoryStore } from "../store/history";
import { uppercaseFirstLetter } from "../utils/string";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NameForm } from "../components/NameForm";

const game = new Game();

export default function DuoFocus() {
  const [keepGameRunning, setKeepGameRunning] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const setHistory = useHistoryStore((store) => store.setHistory);
  const setCurrentBreak = useHistoryStore((store) => store.setCurrentBreak);
  const [isNameFormOpen, setIsNameFormOpen] = useState({
    isOpen: false,
    playerId: undefined,
  });

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  useEffect(() => {
    setHistory(history);
  }, [lastUpdate, history]);

  useEffect(() => {
    setCurrentBreak(breakBalls);
  }, [lastUpdate, breakBalls]);

  const {
    player1,
    player2,
    playerWinning,
    currentPlayer,
    allBalls,
    availableBalls,
    diff,
    history,
    breakBalls,
  } = useMemo(() => {
    const { diff, playerWinning } = game.getPointsDiff();
    return {
      gameState: game.state,
      lowerBallInTable: game.getLowerBallInTable(),
      allBalls: game.getAllBalls(),
      currentPlayer: game.getCurrentPlayer(),
      availableBalls: game.getPossibleBalls(),
      player1: game.player1,
      player2: game.player2,
      diff,
      playerWinning,
      breakBalls: game.break,
      history: game.history,
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
    checkWin();
  };

  const handlePressBall = (ball) => {
    game.addBallToBreak(ball.points);
    setLastUpdate(Date.now());
    checkWin();
  };

  const checkWin = () => {
    if (game.checkWin() && !keepGameRunning) {
      Alert.alert("Jogo matematicamente finalizado.", "Reiniciar o jogo?", [
        {
          text: "Continuar Jogando",
          style: "cancel",
          onPress: () => {
            setKeepGameRunning(true);
          },
        },
        {
          text: "Reiniciar",
          onPress: () => {
            game.reset();
            setLastUpdate(Date.now());
            setKeepGameRunning(false);
          },
        },
      ]);
    }
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
          setKeepGameRunning(false);
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

  const handleHistory = () => {
    router.push({ pathname: "/history" });
  };

  const handleLongPressPlayer = (playerId) => {
    if (Platform.OS === "ios") {
      Alert.prompt("Nome", "Defina o nome do jogador:", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (value) => {
            changePlayerName(playerId, value);
          },
        },
      ]);
    } else {
      setIsNameFormOpen({ isOpen: true, playerId });
    }
  };

  const changePlayerName = (playerId, value) => {
    const name = uppercaseFirstLetter(value);
    game.changePlayerName(playerId, name);
    AsyncStorage.setItem(`duo-player-${playerId}`, name);
    setLastUpdate(Date.now());
    setIsNameFormOpen({ isOpen: false });
  };

  const loadPlayerNames = useCallback(async () => {
    const player1Name = await AsyncStorage.getItem("duo-player-1");
    const player2Name = await AsyncStorage.getItem("duo-player-2");
    game.changePlayerName(1, player1Name || "Jogador 1");
    game.changePlayerName(2, player2Name || "Jogador 2");
    setLastUpdate(Date.now());
  }, []);

  useEffect(() => {
    loadPlayerNames();
  }, [loadPlayerNames]);

  return (
    <View style={{ flex: 1, backgroundColor: "#e8e7d6" }}>
      <StatusBar style="auto" />
      <NameForm
        isOpen={isNameFormOpen.isOpen}
        onClose={() => setIsNameFormOpen({ isOpen: false })}
        onConfirm={(name) => changePlayerName(isNameFormOpen.playerId, name)}
      />
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
          onLongPress={() => handleLongPressPlayer(player1.id)}
        />
        <Result
          diff={diff}
          playerWinning={playerWinning}
          onUndo={handleUndo}
          onReset={handleReset}
          onHistory={handleHistory}
        />
        <PlayerFocus
          currentPlayer={currentPlayer}
          player={player2}
          onFallPress={handleFall}
          onPassTurnPress={handlePassTurn}
          onLongPress={() => handleLongPressPlayer(player2.id)}
        />
      </View>
      <Separator marginTop={0} />
      <AllBallsList
        allBalls={allBalls}
        availableBalls={availableBalls}
        onPressBall={handlePressBall}
      />
    </View>
  );
}

const Result = ({ diff, playerWinning, onUndo, onReset, onHistory }) => {
  return (
    <View style={{ flex: 1, height: "100%", gap: 10 }}>
      <View
        style={{
          ...styles.pointsContainer,
          backgroundColor: diff > 0 ? playerWinning.bgColor : "white",
        }}
      >
        <Text
          style={{
            ...styles.pointsText,
            color: diff > 0 ? "white" : "black",
          }}
        >
          {diff > 0 ? diff : "="}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable onPress={onUndo} style={styles.iconButton}>
          <Text style={{ color: "white", fontSize: 25 }}>
            <MaterialIcons name="undo" size={24} color="#484d60" />
          </Text>
        </Pressable>
        <Pressable
          onPress={onReset}
          style={styles.iconButton}
        >
          <Text style={{ color: "white" }}>
            <FontAwesome name="undo" size={24} color="#484d60" />
          </Text>
        </Pressable>
        <Pressable
          onPress={onHistory}
          style={styles.iconButton}
        >
          <Text style={{ color: "white", fontSize: 25 }}>
            <FontAwesome6 name="newspaper" size={24} color="#484d60" />
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pointsContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  pointsText: {
    padding: 0,
    fontSize: 130,
    lineHeight: 147,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  iconButton: {
    flex: 1,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#484d60",
  },
});
