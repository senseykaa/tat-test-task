import { SearchDestinationForm } from "~/components/SearchDestinationForm";
import { SearchResults } from "~/components/SearchResults";
import { useSearchTours } from "~/hooks/useSearchTours";

import styles from "./styles.module.scss";

export const Home = () => {
  const { handleSearch, isDestinationChanged, isSearching } = useSearchTours();

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.heading}>Знайди свій ідеальний тур</h1>

        <p className={styles.subheading}>Найкращі ціни на готелі по всьому світу</p>

        <SearchDestinationForm
          onSubmit={handleSearch}
          isDestinationChanged={isDestinationChanged}
          isSearching={isSearching}
        />

        <SearchResults />
      </div>
    </div>
  );
};
