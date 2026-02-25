import MockAdapter from "axios-mock-adapter";

import { apiClient } from "../client";

import {
  getCountries,
  getHotel,
  getHotels,
  getPrice,
  getSearchPrices,
  searchGeo,
  startSearchPrices,
  stopSearchPrices,
} from "./api.js";

const mock = new MockAdapter(apiClient);

const parseResponse = async (response: Response) => {
  const data = await response.json();
  return data;
};

const getLastUrlSegment = (url: string | undefined): string => {
  if (!url) throw new Error("URL is missing");
  const segment = url.split("/").pop();
  if (!segment) throw new Error(`Could not extract segment from URL: ${url}`);
  return segment;
};

// Geo
mock.onGet("/countries").reply(async () => {
  try {
    const response = await getCountries();
    return [200, await parseResponse(response)];
  } catch (error) {
    const data = await parseResponse(error as Response);
    return [data.code, data];
  }
});

mock.onGet("/geo").reply(async (config) => {
  try {
    const query = config.params?.query as string | undefined;
    const response = await searchGeo(query);
    return [200, await parseResponse(response)];
  } catch (error) {
    const data = await parseResponse(error as Response);
    return [data.code, data];
  }
});

// Hotels
mock.onGet(/\/hotels\/(\d+)$/).reply(async (config) => {
  try {
    const hotelId = getLastUrlSegment(config.url);
    const response = await getHotel(hotelId);
    return [200, await parseResponse(response)];
  } catch (error) {
    const data = await parseResponse(error as Response);
    return [data.code, data];
  }
});

mock.onGet("/hotels").reply(async (config) => {
  try {
    const countryId = config.params?.countryId as string;
    const response = await getHotels(countryId);
    return [200, await parseResponse(response)];
  } catch (error) {
    const data = await parseResponse(error as Response);
    return [data.code, data];
  }
});

// Prices
mock.onPost("/prices/search/start").reply(async (config) => {
  try {
    const { countryId } = JSON.parse(config.data as string);
    const response = await startSearchPrices(countryId);
    return [200, await parseResponse(response)];
  } catch (error) {
    const data = await parseResponse(error as Response);
    return [data.code, data];
  }
});

mock.onGet(/\/prices\/search\/(.+)$/).reply(async (config) => {
  try {
    const token = getLastUrlSegment(config.url);
    const response = await getSearchPrices(token);
    return [200, await parseResponse(response)];
  } catch (error) {
    const data = await parseResponse(error as Response);
    return [data.code, data];
  }
});

mock.onDelete(/\/prices\/search\/(.+)$/).reply(async (config) => {
  try {
    const token = getLastUrlSegment(config.url);
    const response = await stopSearchPrices(token);
    return [200, await parseResponse(response)];
  } catch (error) {
    const data = await parseResponse(error as Response);
    return [data.code, data];
  }
});

mock.onGet(/\/prices\/(.+)$/).reply(async (config) => {
  try {
    const priceId = getLastUrlSegment(config.url);

    const response = await getPrice(priceId);
    return [200, await parseResponse(response)];
  } catch (error) {
    const data = await parseResponse(error as Response);
    return [data.code, data];
  }
});
