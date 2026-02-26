import { useRouteError } from "react-router-dom";

import styles from "./styles.module.scss";

export const ErrorBoundary = () => {
  const error = useRouteError();

  console.error("[ErrorBoundary]", error);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Щось пішло не так</h1>

      <p className={styles.message}>Сталась непередбачена помилка. Спробуйте оновити сторінку.</p>

      <button className={styles.button} onClick={() => window.location.reload()} type="button">
        Оновити сторінку
      </button>
    </div>
  );
};
