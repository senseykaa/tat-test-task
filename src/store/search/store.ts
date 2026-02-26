import { create } from "zustand";

import type { SearchStore } from "./types";

export const useSearchStore = create<SearchStore>((set) => ({
  destination: null,

  setDestination: (destination) => set({ destination }),
  clearDestination: () => set({ destination: null }),
}));
