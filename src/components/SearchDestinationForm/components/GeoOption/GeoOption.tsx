import { GEO_ICONS } from "~/constants/geo";
import type { GeoOption as GeoOptionType } from "~/types/global";

import styles from "./styles.module.scss";

type Props = {
  option: GeoOptionType;
  isActive: boolean;
};

export const GeoOption = ({ option, isActive }: Props) => {
  return (
    <div className={`${styles.option} ${isActive ? styles.active : ""}`}>
      <span className={styles.icon}>
        {option.type === "country" ? (
          <img src={option.flag} alt={option.label} width={20} height={14} />
        ) : (
          GEO_ICONS[option.type]
        )}
      </span>

      <span className={styles.label}>{option.label}</span>

      <span className={styles.type}>{option.type}</span>
    </div>
  );
};
