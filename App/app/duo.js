import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, View, ScrollView, Platform } from "react-native";
import { Game } from "../components/game";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AllBallsList } from "../components/AllBallsList";
import { Separator } from "../components/Separator";
import { BreakBallsList } from "../components/BreakBallsList";
import { CurrentBall } from "../components/CurrentBall";
import { CurrentPlayer } from "../components/CurrentPlayer";
import { Player } from "../components/Player";
import { Header } from "../components/Header";
import { uppercaseFirstLetter } from "../utils/string";
import { NameForm } from "../components/NameForm";
import { PlayerPoints } from "../components/PlayerPoints";

const game = new Game();

export default function Duo() {
  const [isNameFormOpen, setIsNameFormOpen] = useState({
    isOpen: false,
    playerId: undefined,
  });
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const {
    player1,
    player2,
    playerWinning,
    currentPlayer,
    allBalls,
    availableBalls,
    diff,
    breakBalls,
    lowerBallInTable,
    gameState,
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
    };
  }, [lastUpdate]);

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

  const handleBack = () => {
    Alert.alert("Atenção", "Voltar para a tela inicial?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          game.reset();
          setLastUpdate(Date.now());
          router.back();
        },
      },
    ]);
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

  return (
    <View style={{ flex: 1, backgroundColor: "#e8e7d6" }}>
      <StatusBar style="auto" />
      <NameForm
        isOpen={isNameFormOpen.isOpen}
        onClose={() => setIsNameFormOpen({ isOpen: false })}
        onConfirm={(name) => changePlayerName(isNameFormOpen.playerId, name)}
      />
      <Header onReset={handleReset} onUndo={handleUndo} onBack={handleBack} />
      <Separator marginTop={0} marginBottom={0} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            alignCenter: "center",
            padding: 10,
          }}
        >
          <PlayerPoints
            players={[player1, player2]}
            diff={diff}
            playerWinning={playerWinning}
          />
          <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
            <Player
              player={player1}
              playerWinning={playerWinning}
              diff={diff}
              playing={currentPlayer.id === player1.id}
              onPress={() => handlePassTurn(player1.id)}
              onFall={() => handleFall(player1.id)}
              onLongPress={() => handleLongPressPlayer(player1.id)}
            />
            <Player
              player={player2}
              playerWinning={playerWinning}
              playing={currentPlayer.id === player2.id}
              diff={diff}
              onPress={() => handlePassTurn(player2.id)}
              onFall={() => handleFall(player2.id)}
              onLongPress={() => handleLongPressPlayer(player2.id)}
            />
          </View>
          <Separator />
          <CurrentPlayer currentPlayer={currentPlayer} />
          <CurrentBall lowerBall={lowerBallInTable} gameState={gameState} />
          <BreakBallsList breakBalls={breakBalls} />
        </View>
      </ScrollView>
      <Separator marginTop={0} />
      <AllBallsList
        allBalls={allBalls}
        availableBalls={availableBalls}
        onPressBall={handlePressBall}
      />
    </View>
  );
}
