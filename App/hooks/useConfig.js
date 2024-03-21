import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect } from "react";
import { useConfigStore } from "../store/config";

export function useConfig() {
  const {
    isPlayerDiffEnabled,
    isBigScoreEnabled,
    isFocusModeEnabled,
    setIsPlayerDiffEnabled,
    setIsBigScoreEnabled,
    setIsFocusModeEnabled,
  } = useConfigStore();

  const togglePlayerDiff = useCallback((value) => {
    setIsPlayerDiffEnabled(value);
    AsyncStorage.setItem("player-diff", value ? "true" : "false");
  }, []);

  const toggleBigScore = useCallback((value) => {
    setIsBigScoreEnabled(value);
    AsyncStorage.setItem("big-score", value ? "true" : "false");
  }, []);

  const toggleFocusMode = useCallback((value) => {
    setIsFocusModeEnabled(value);
    AsyncStorage.setItem("focus-mode", value ? "true" : "false");
  }, []);

  const loadConfig = async () => {
    const playerDiff = await AsyncStorage.getItem("player-diff");
    const bigScore = await AsyncStorage.getItem("big-score");
    const focusMode = await AsyncStorage.getItem("focus-mode");
    setIsPlayerDiffEnabled(playerDiff === "true");
    setIsBigScoreEnabled(bigScore === "true");
    setIsFocusModeEnabled(focusMode === "true");
  };

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return {
    isPlayerDiffEnabled,
    isBigScoreEnabled,
    isFocusModeEnabled,
    togglePlayerDiff,
    toggleBigScore,
    toggleFocusMode,
  };
}
