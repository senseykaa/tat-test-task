import { isAxiosError } from "axios";

import { getSearchPrices, startSearchPrices, stopSearchPrices } from "~/api/prices/api";
import type { PricesMap } from "~/api/prices/types";

import { MAX_RETRIES } from "./constants";
import type { SearchToken } from "./types";
import { getWaitMs, wait } from "./utils";

const pollSearchPrices = async (token: SearchToken, retries = 0): Promise<PricesMap> => {
  if (token.cancelled) return {};

  try {
    const { data } = await getSearchPrices(token.value);

    return data.prices;
  } catch (error: unknown) {
    if (token.cancelled) return {};

    // 425 — not ready yet, wait and retry
    if (isAxiosError(error) && error.response?.status === 425) {
      const waitUntil = error.response.data?.waitUntil;
      const waitMs = waitUntil ? getWaitMs(waitUntil) : 1000;

      await wait(waitMs);

      return pollSearchPrices(token, retries);
    }

    // Other errors — retry up to MAX_RETRIES
    if (retries < MAX_RETRIES) {
      await wait(1000);

      return pollSearchPrices(token, retries + 1);
    }

    throw error;
  }
};

export const createSearchToken = (value: string): SearchToken => ({
  value,
  cancelled: false,
});

export const startSearch = async (countryId: string, token: SearchToken): Promise<PricesMap> => {
  const { data } = await startSearchPrices(countryId);

  token.value = data.token;

  if (token.cancelled) return {};

  const waitMs = getWaitMs(data.waitUntil);

  await wait(waitMs);

  return pollSearchPrices(token);
};

export const cancelSearch = async (token: SearchToken): Promise<void> => {
  token.cancelled = true;

  if (token.value) {
    try {
      await stopSearchPrices(token.value);
    } catch {
      // Ignore error - token might have already been deleted
    }
  }
};
