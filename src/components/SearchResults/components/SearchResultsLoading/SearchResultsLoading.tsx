import styles from "./styles.module.scss";

export const SearchResultsLoading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />

      <p className={styles.text}>Шукаємо найкращі тури для вас...</p>
    </div>
  );
};
