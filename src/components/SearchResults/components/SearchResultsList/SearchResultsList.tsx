import type { TourOffer } from "~/types/global";

import styles from "./styles.module.scss";

type Props = {
  tours: TourOffer[];
};

export const SearchResultsList = ({ tours }: Props) => {
  // todo: task 3
  return <div className={styles.wrapper}>{tours.length} турів знайдено</div>;
};
