import type { Hotel } from "~/api/hotels/types";

export type TourOffer = {
  id: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  hotel: Hotel;
};

export type GeoOption =
  | { type: "country"; id: string; label: string; flag: string }
  | { type: "city"; id: number; label: string }
  | { type: "hotel"; id: number; label: string; img: string };

export type SearchParams = {
  destination: GeoOption;
};
