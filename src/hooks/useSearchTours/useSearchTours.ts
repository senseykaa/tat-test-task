import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

import { getCountries } from "~/api/geo";
import { getHotels } from "~/api/hotels/api";
import { cancelSearch, createSearchToken, startSearch } from "~/services/search";
import type { SearchToken } from "~/services/search/types";
import { aggregateTours } from "~/services/tours";
import {
  useDestination,
  useResetSearch,
  useSearchStatus,
  useSetError,
  useSetStatus,
  useSetTours,
} from "~/store/search/selectors";
import type { GeoOption } from "~/types/global";

export const useSearchTours = () => {
  const tokenRef = useRef<SearchToken | null>(null);
  const lastSearchedDestinationRef = useRef<GeoOption | null>(null);

  const destination = useDestination();
  const status = useSearchStatus();
  const setStatus = useSetStatus();
  const setTours = useSetTours();
  const setError = useSetError();
  const reset = useResetSearch();

  const countryId = (() => {
    if (!destination) return null;

    if (destination.type === "country") return destination.id;

    // city and hotel both have countryId
    return destination.countryId;
  })();

  const isSearching = status === "loading";
  const isDestinationChanged = destination?.id !== lastSearchedDestinationRef.current?.id;

  // Cache hotels by countryId — don't fetch them every time
  const { data: hotelsData } = useQuery({
    queryKey: ["hotels", countryId],
    queryFn: () => getHotels(countryId!),
    enabled: !!countryId,
    staleTime: Infinity,
  });

  const { data: countriesData } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: Infinity,
  });

  const handleSearch = useCallback(async () => {
    if (!countryId) return;

    // Cancel previous search if exists
    if (tokenRef.current) {
      await cancelSearch(tokenRef.current);
    }

    // token.value will be populated by startSearch after API response
    const token = createSearchToken("");
    tokenRef.current = token;
    lastSearchedDestinationRef.current = destination;

    reset();
    setStatus("loading");

    try {
      const prices = await startSearch(countryId, token);
      if (token.cancelled) return;

      const hotels = hotelsData?.data ?? {};
      const countries = countriesData?.data ?? {};
      const tours = aggregateTours(prices, hotels, countries);

      setTours(tours);
      setStatus("success");
    } catch {
      if (token.cancelled) return;

      setError("Під час пошуку сталася помилка. Спробуйте ще раз.");

      setStatus("error");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, hotelsData, countriesData, reset, setStatus, setTours, setError]);

  return { handleSearch, status, isSearching, isDestinationChanged };
};
