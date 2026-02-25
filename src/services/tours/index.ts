import type { HotelsMap } from "~/api/hotels/types";
import type { PricesMap } from "~/api/prices/types";
import type { TourOffer } from "~/types/global";

export const aggregateTours = (prices: PricesMap, hotels: HotelsMap): TourOffer[] => {
  return Object.values(prices)
    .reduce<TourOffer[]>((acc, price) => {
      const hotel = price.hotelID ? hotels[price.hotelID] : undefined;

      if (!hotel) return acc;

      acc.push({
        id: price.id,
        amount: price.amount,
        currency: price.currency,
        startDate: price.startDate,
        endDate: price.endDate,
        hotel,
      });

      return acc;
    }, [])
    .sort((a, b) => a.amount - b.amount);
};
