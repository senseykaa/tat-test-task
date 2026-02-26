import styles from "./styles.module.scss";

type Props = {
  message: string | null;
};

export const SearchResultsError = ({ message }: Props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>⚠️</span>

      <p className={styles.message}>{message ?? "Сталася помилка. Спробуйте ще раз."}</p>
    </div>
  );
};
