import { Link } from "react-router-dom";

import { PATHS } from "../router/routes";

import styles from "./styles.module.scss";

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.code}>404</span>

      <h1 className={styles.title}>Сторінку не знайдено</h1>

      <p className={styles.message}>Схоже, такої сторінки не існує.</p>

      <Link to={PATHS.HOME} className={styles.link}>
        Повернутись на головну
      </Link>
    </div>
  );
};
