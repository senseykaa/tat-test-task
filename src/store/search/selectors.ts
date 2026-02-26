import { useSearchStore } from "./store";

export const useDestination = () => useSearchStore((state) => state.destination);
export const useSetDestination = () => useSearchStore((state) => state.setDestination);
export const useClearDestination = () => useSearchStore((state) => state.clearDestination);
