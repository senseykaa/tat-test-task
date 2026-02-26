import type { GeoOption, TourOffer } from "~/types/global";

export type SearchStatus = "idle" | "loading" | "success" | "error";

export type SearchStore = {
  destination: GeoOption | null;
  status: SearchStatus;
  tours: TourOffer[];
  error: string | null;

  setDestination: (destination: GeoOption) => void;
  clearDestination: () => void;
  setStatus: (status: SearchStatus) => void;
  setTours: (tours: TourOffer[]) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};
