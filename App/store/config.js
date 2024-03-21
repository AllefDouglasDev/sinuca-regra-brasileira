import { create } from 'zustand'

export const useConfigStore = create((set) => ({
  isPlayerDiffEnabled: false,
  isBigScoreEnabled: false, 
  isFocusModeEnabled: false,
  setIsPlayerDiffEnabled: (value) => set({ isPlayerDiffEnabled: value }),
  setIsBigScoreEnabled: (value) => set({ isBigScoreEnabled: value }),
  setIsFocusModeEnabled: (value) => set({ isFocusModeEnabled: value }),
}))
