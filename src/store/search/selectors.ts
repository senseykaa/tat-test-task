import { useSearchStore } from "./store";

export const useDestination = () => useSearchStore((state) => state.destination);
export const useSetDestination = () => useSearchStore((state) => state.setDestination);
export const useClearDestination = () => useSearchStore((state) => state.clearDestination);

export const useSearchStatus = () => useSearchStore((state) => state.status);

export const useTours = () => useSearchStore((state) => state.tours);

export const useSearchError = () => useSearchStore((state) => state.error);

export const useSetStatus = () => useSearchStore((state) => state.setStatus);

export const useSetTours = () => useSearchStore((state) => state.setTours);

export const useSetError = () => useSearchStore((state) => state.setError);

export const useResetSearch = () => useSearchStore((state) => state.reset);
