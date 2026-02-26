import styles from "./styles.module.scss";

export const SearchResultsEmpty = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>🔍</span>

      <p className={styles.message}>За вашим запитом турів не знайдено</p>
    </div>
  );
};
