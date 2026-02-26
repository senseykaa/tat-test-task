import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getCountries, searchGeo } from "~/api/geo/api";
import { QUERY_KEYS } from "~/constants/queries";
import type { GeoOption } from "~/types/tours";

import { useDebounce } from "../useDebounce";

import { GEO_SEARCH_DEBOUNCE_MS } from "./constants";
import { toCountryOptions, toGeoOptions } from "./utils";

export const useGeoSearch = () => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, GEO_SEARCH_DEBOUNCE_MS);

  const { data: countries, isLoading: isLoadingCountries } = useQuery({
    queryKey: [QUERY_KEYS.COUNTRIES],
    queryFn: getCountries,
    staleTime: Infinity,
  });

  const { data: geo, isLoading: isLoadingGeo } = useQuery({
    queryKey: [QUERY_KEYS.GEO, debouncedQuery],
    queryFn: () => searchGeo(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const options: GeoOption[] = (() => {
    if (debouncedQuery) {
      return geo ? toGeoOptions(geo.data) : [];
    }

    return countries ? toCountryOptions(countries.data) : [];
  })();

  const isLoading = debouncedQuery ? isLoadingGeo : isLoadingCountries;

  return {
    value: options,
    isLoading,
    setQuery,
  };
};
