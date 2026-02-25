import { apiClient } from "../client";

import type {
  GetSearchPricesResponse,
  PriceOffer,
  StartSearchResponse,
  StopSearchResponse,
} from "./types";

export const startSearchPrices = (countryId: string) => {
  return apiClient.post<StartSearchResponse>("/prices/search/start", { countryId });
};

export const getSearchPrices = (token: string) => {
  return apiClient.get<GetSearchPricesResponse>(`/prices/search/${token}`);
};

export const stopSearchPrices = (token: string) => {
  return apiClient.delete<StopSearchResponse>(`/prices/search/${token}`);
};

export const getPrice = (priceId: string) => {
  return apiClient.get<PriceOffer>(`/prices/${priceId}`);
};
