import type { CountriesMap } from "~/api/geo/types";
import type { HotelsMap } from "~/api/hotels/types";
import type { PricesMap } from "~/api/prices/types";
import type { TourOffer } from "~/types/global";

export const aggregateTours = (
  prices: PricesMap,
  hotels: HotelsMap,
  countries: CountriesMap,
): TourOffer[] => {
  return Object.values(prices)
    .reduce<TourOffer[]>((acc, price) => {
      const hotel = price.hotelID ? hotels[price.hotelID] : undefined;
      const country = hotel ? countries[hotel.countryId] : undefined;

      if (!hotel || !country) return acc;

      acc.push({
        id: price.id,
        amount: price.amount,
        currency: price.currency,
        startDate: price.startDate,
        endDate: price.endDate,
        hotel: {
          ...hotel,
          countryFlag: country.flag,
        },
      });

      return acc;
    }, [])
    .sort((a, b) => a.amount - b.amount);
};
