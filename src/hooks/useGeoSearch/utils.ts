import type { CountriesMap, GeoResponse } from "~/api/geo/types";
import type { GeoOption } from "~/types/global";

export const toGeoOptions = (data: GeoResponse): GeoOption[] => {
  return Object.values(data).map((entity) => {
    if (entity.type === "country") {
      return { type: "country", id: entity.id, label: entity.name, flag: entity.flag };
    }

    if (entity.type === "city") {
      return { type: "city", id: entity.id, label: entity.name };
    }

    return { type: "hotel", id: entity.id, label: entity.name, img: entity.img };
  });
};

export const toCountryOptions = (data: CountriesMap): GeoOption[] => {
  return Object.values(data).map((country) => ({
    type: "country",
    id: country.id,
    label: country.name,
    flag: country.flag,
  }));
};
