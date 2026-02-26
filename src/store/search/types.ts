import type { GeoOption } from "~/types/global";

export type SearchStore = {
  destination: GeoOption | null;

  setDestination: (destination: GeoOption) => void;
  clearDestination: () => void;
};
