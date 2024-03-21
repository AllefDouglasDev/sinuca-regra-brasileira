import { StatusBar } from "expo-status-bar";
import { Alert, View, ScrollView } from "react-native";
import { Game } from "./game";
import { useMemo, useState } from "react";
import { AllBallsList } from "./AllBallsList";
import { Separator } from "./Separator";
import { Footer } from "./Footer";
import { BreakBallsList } from "./BreakBallsList";
import { CurrentBall } from "./CurrentBall";
import { CurrentPlayer } from "./CurrentPlayer";
import { Player } from "./Player";

const game = new Game();

export function Home() {
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
  } = useMemo(() => {
    const { diff, playerWinning } = game.getPointsDiff();
    return {
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

  const handlePassTurn = () => {
    game.passTurn();
    setLastUpdate(Date.now());
  };

  const handleFall = () => {
    game.fall(currentPlayer.id === player1.id ? player2.id : player1.id);
    game.passTurn();
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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#e8e7d6" }}
      style={{ backgroundColor: "#e8e7d6" }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#e8e7d6",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <StatusBar style="auto" />
        <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
          <Player player={player1} playerWinning={playerWinning} diff={diff} />
          <Player player={player2} playerWinning={playerWinning} diff={diff} />
        </View>
        <Separator />
        <CurrentPlayer currentPlayer={currentPlayer} />
        <CurrentBall currentBall={lowerBallInTable} />
        <BreakBallsList breakBalls={breakBalls} />
        <Separator />
        <AllBallsList
          allBalls={allBalls}
          availableBalls={availableBalls}
          onPressBall={handlePressBall}
        />
        <Footer
          onPassTurn={handlePassTurn}
          onFall={handleFall}
          onReset={handleReset}
          onUndo={handleUndo}
        />
      </View>
    </ScrollView>
  );
}
