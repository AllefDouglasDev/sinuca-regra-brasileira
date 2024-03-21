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

export default function Trio() {
  const [isNameFormOpen, setIsNameFormOpen] = useState({
    isOpen: false,
    playerId: undefined,
  });
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const {
    player1,
    player2,
    player3,
    playerWinning,
    currentPlayer,
    allBalls,
    availableBalls,
    breakBalls,
    lowerBallInTable,
    gameState,
  } = useMemo(() => {
    const { diff, playerWinning } = game.getPointsDiff();
    return {
      gameState: game.state,
      currentBall: game.getCurrentBallInTable(),
      lowerBallInTable: game.getLowerBallInTable(),
      allBalls: game.getAllBalls(),
      currentPlayer: game.getCurrentPlayer(),
      availableBalls: game.getPossibleBalls(),
      player1: game.player1,
      player2: game.player2,
      player3: game.player3,
      diff,
      playerWinning,
      breakBalls: game.break,
    };
  }, [lastUpdate]);

  const loadPlayerNames = useCallback(async () => {
    const player1Name = await AsyncStorage.getItem("trio-player-1");
    const player2Name = await AsyncStorage.getItem("trio-player-2");
    const player3Name = await AsyncStorage.getItem("trio-player-3");
    game.changePlayerName(1, player1Name || "Jogador 1");
    game.changePlayerName(2, player2Name || "Jogador 2");
    game.changePlayerName(3, player3Name || "Jogador 3");
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
    AsyncStorage.setItem(`trio-player-${playerId}`, name);
    setLastUpdate(Date.now());
    setIsNameFormOpen({ isOpen: false });
  };

  const playerDiff = useCallback((playerId, leftId, rightId) => {
    const leftPlayer = game.getPlayerById(leftId);
    const rightPlayer = game.getPlayerById(rightId);
    const leftDiff = game.comparePlayersDiff(playerId, leftId);
    const rightDiff = game.comparePlayersDiff(playerId, rightId);
    return {
      leftDiff: {
        color: leftPlayer.bgColor,
        value: leftDiff.playerWinning.id === playerId ? leftDiff.diff : 0,
      },
      rightDiff: {
        color: rightPlayer.bgColor,
        value: rightDiff.playerWinning.id === playerId ? rightDiff.diff : 0,
      },
    };
  }, []);

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
            alignItems: "center",
            padding: 10,
          }}
        >
          <PlayerPoints players={[player1, player2, player3]} />
          <View
            style={{
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Player
              player={player1}
              playerWinning={playerWinning}
              playing={currentPlayer.id === player1.id}
              showSingleDiff={false}
              {...playerDiff(player1.id, player2.id, player3.id)}
              onPress={() => handlePassTurn(player1.id)}
              onFall={() => handleFall(player1.id)}
              onLongPress={() => handleLongPressPlayer(player1.id)}
            />
            <Player
              player={player2}
              playerWinning={playerWinning}
              playing={currentPlayer.id === player2.id}
              showSingleDiff={false}
              {...playerDiff(player2.id, player1.id, player3.id)}
              onPress={() => handlePassTurn(player2.id)}
              onFall={() => handleFall(player2.id)}
              onLongPress={() => handleLongPressPlayer(player2.id)}
            />
            <Player
              player={player3}
              playerWinning={playerWinning}
              playing={currentPlayer.id === player3.id}
              showSingleDiff={false}
              {...playerDiff(player3.id, player1.id, player2.id)}
              onPress={() => handlePassTurn(player3.id)}
              onFall={() => handleFall(player3.id)}
              onLongPress={() => handleLongPressPlayer(player3.id)}
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
