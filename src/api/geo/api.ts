import { apiClient } from "../client";

import type { CountriesMap, GeoResponse } from "./types";

export const getCountries = () => {
  return apiClient.get<CountriesMap>("/countries");
};

export const searchGeo = (query?: string) => {
  return apiClient.get<GeoResponse>("/geo", { params: { query } });
};
