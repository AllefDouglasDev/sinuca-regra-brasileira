import { create } from 'zustand'

export const useHistoryStore = create((set) => ({
  history: [],
  currentBreak: [],
  setHistory: (history) => set({ history }),
  setCurrentBreak: (currentBreak) => set({ currentBreak }),
}))
