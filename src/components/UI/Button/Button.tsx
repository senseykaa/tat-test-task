import { type ButtonHTMLAttributes, forwardRef } from "react";

import styles from "./styles.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <button ref={ref} className={`${styles.button} ${className ?? ""}`} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
