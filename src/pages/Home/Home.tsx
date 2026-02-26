import { SearchDestinationForm } from "~/components/SearchDestinationForm";

import styles from "./styles.module.scss";

export const Home = () => {
  const onSubmit = () => {
    // todo
    console.log("search submitted");
  };

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.heading}>Знайди свій ідеальний тур</h1>

        <p className={styles.subheading}>Найкращі ціни на готелі по всьому світу</p>

        <SearchDestinationForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};
