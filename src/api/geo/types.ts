import type { Hotel } from "../hotels/types";

export type Country = {
  id: string;
  name: string;
  flag: string;
};

export type City = {
  id: number;
  name: string;
  countryId: string;
};

export type GeoEntity =
  | (Country & { type: "country" })
  | (City & { type: "city" })
  | (Hotel & { type: "hotel" });

export type CountriesMap = Record<string, Country>;
export type GeoResponse = Record<string, GeoEntity>;
