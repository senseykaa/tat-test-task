import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import styles from "./styles.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  suffix?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, Props>(({ className, suffix, ...props }, ref) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <input ref={ref} className={styles.input} {...props} />

      {suffix && <div className={styles.suffix}>{suffix}</div>}
    </div>
  );
});

Input.displayName = "Input";
