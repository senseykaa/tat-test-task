import { apiClient } from "../client";

import type { Hotel, HotelsMap } from "./types";

export const getHotels = (countryId: string) => {
  return apiClient.get<HotelsMap>("/hotels", { params: { countryId } });
};

export const getHotel = (hotelId: number | string) => {
  return apiClient.get<Hotel>(`/hotels/${hotelId}`);
};
