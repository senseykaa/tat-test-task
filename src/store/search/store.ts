import { create } from "zustand";

import type { SearchStore } from "./types";

export const useSearchStore = create<SearchStore>((set) => ({
  destination: null,
  status: "idle",
  tours: [],
  error: null,

  setDestination: (destination) => set({ destination }),
  clearDestination: () => set({ destination: null }),

  setStatus: (status) => set({ status }),

  setTours: (tours) => set({ tours }),

  setError: (error) => set({ error }),

  reset: () => set({ status: "idle", tours: [], error: null }),
}));
