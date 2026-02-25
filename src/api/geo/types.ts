export type Country = {
  id: string;
  name: string;
  flag: string;
};

export type City = {
  id: number;
  name: string;
};

export type GeoEntity = (Country & { type: "country" }) | (City & { type: "city" });

export type CountriesMap = Record<string, Country>;
export type GeoResponse = Record<string, GeoEntity>;
