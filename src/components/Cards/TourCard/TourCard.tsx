import type { TourOffer } from "~/types/global";
import { formatCurrency } from "~/utils/price";
import { formatDateToLocale } from "~/utils/time";

import styles from "./styles.module.scss";

type Props = {
  tour: TourOffer;
  onOpenPrice: (priceId: string) => void;
};

export const TourCard = ({ tour, onOpenPrice }: Props) => {
  const { hotel, amount, currency, startDate, id } = tour;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={hotel.img} alt={hotel.name} className={styles.image} loading="lazy" />
      </div>

      <div className={styles.content}>
        <h3 className={styles.hotelName}>{hotel.name}</h3>

        <div className={styles.location}>
          <img src={hotel.countryFlag} alt={hotel.countryName} width={20} height={14} />

          <span>
            {hotel.countryName}, {hotel.cityName}
          </span>
        </div>

        <div className={styles.dates}>
          <span className={styles.datesLabel}>Старт туру</span>

          <span>{formatDateToLocale(startDate)}</span>
        </div>

        <p className={styles.price}>{formatCurrency(amount, currency)}</p>

        <button className={styles.openPrice} onClick={() => onOpenPrice(id)} type="button">
          Відкрити ціну
        </button>
      </div>
    </div>
  );
};
