import { autoUpdate, computePosition, flip, offset, size } from "@floating-ui/dom";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";

type Props = {
  isOpen: boolean;
  anchor: ReactNode;
  children: ReactNode;
  onClose: () => void;
};

export const Popover = ({ isOpen, anchor, children, onClose }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  const [floatingStyles, setFloatingStyles] = useState<CSSProperties>({});

  useEffect(() => {
    if (!isOpen || !anchorRef.current || !floatingRef.current) return;

    const anchor = anchorRef.current;
    const floating = floatingRef.current;

    const updatePosition = () => {
      computePosition(anchor, floating, {
        placement: "bottom-start",
        middleware: [
          offset(4),
          flip(),
          size({
            apply({ rects, elements }) {
              Object.assign(elements.floating.style, {
                width: `${rects.reference.width}px`,
              });
            },
          }),
        ],
      }).then(({ x, y }) => {
        setFloatingStyles({
          position: "absolute",
          left: x,
          top: y,
        });
      });
    };

    const cleanup = autoUpdate(anchor, floating, updatePosition);

    return cleanup;
  }, [isOpen]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", onClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={anchorRef}>{anchor}</div>

      {isOpen && (
        <div ref={floatingRef} style={floatingStyles} className={styles.popover}>
          {children}
        </div>
      )}
    </div>
  );
};
