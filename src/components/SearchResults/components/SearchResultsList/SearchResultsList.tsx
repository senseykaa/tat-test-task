import { TourCard } from "~/components/Cards/TourCard";
import type { TourOffer } from "~/types/tours";

import styles from "./styles.module.scss";

type Props = {
  tours: TourOffer[];
};

export const SearchResultsList = ({ tours }: Props) => {
  const handleOpenPrice = (priceId: string) => {
    console.log("open price", priceId);
  };

  return (
    <ul className={styles.grid}>
      {tours.map((tour) => (
        <li key={tour.id}>
          <TourCard tour={tour} onOpenPrice={handleOpenPrice} />
        </li>
      ))}
    </ul>
  );
};
