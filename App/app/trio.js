import { useKeepAwake } from "expo-keep-awake";
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "../components/StatusBar";
import { Alert, View, Pressable, ScrollView, Platform } from "react-native";
import { Game } from "../components/game";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AllBallsList } from "../components/AllBallsList";
import { Separator } from "../components/Separator";
import { PlayerFocus } from "../components/PlayerFocus";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uppercaseFirstLetter } from "../utils/string";
import { NameForm } from "../components/NameForm";

const game = new Game();

export default function TrioFocus() {
  useKeepAwake();
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [isNameFormOpen, setIsNameFormOpen] = useState({
    isOpen: false,
    playerId: undefined,
  });

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

  return (
    <ScrollView
      className="bg-teal-600 flex-1"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 bg-teal-600">
        <StatusBar />
        <NameForm
          isOpen={isNameFormOpen.isOpen}
          onClose={() => setIsNameFormOpen({ isOpen: false })}
          onConfirm={(name) => changePlayerName(isNameFormOpen.playerId, name)}
        />
        <Separator marginTop={0} marginBottom={0} />
        <View className="flex-row p-2.5 flex-1">
          <PlayerFocus
            currentPlayer={currentPlayer}
            player={player1}
            onFallPress={handleFall}
            onPassTurnPress={handlePassTurn}
            onLongPress={() => handleLongPressPlayer(player1.id)}
          />
          <PlayerFocus
            currentPlayer={currentPlayer}
            player={player2}
            onFallPress={handleFall}
            onPassTurnPress={handlePassTurn}
            onLongPress={() => handleLongPressPlayer(player2.id)}
          />
          <PlayerFocus
            currentPlayer={currentPlayer}
            player={player3}
            onFallPress={handleFall}
            onPassTurnPress={handlePassTurn}
            onLongPress={() => handleLongPressPlayer(player3.id)}
          />
        </View>
        <Separator marginTop={0} />
        <View className="flex-1">
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            <View className="w-full flex-row">
              <AllBallsList
                allBalls={allBalls}
                availableBalls={availableBalls}
                onPressBall={handlePressBall}
              />
              <View className="mt-2 mr-4">
                <Pressable
                  className="items-center justify-center border border-zinc-800 rounded p-2 mb-1 min-w-[40px]"
                  onPress={handleUndo}
                >
                  <MaterialIcons name="undo" size={24} color="black" />
                </Pressable>
                <Pressable
                  className="items-center justify-center border border-zinc-800 rounded p-2 mb-1 min-w-[40px]"
                  onPress={handleReset}
                >
                  <FontAwesome name="undo" size={24} color="black" />
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
