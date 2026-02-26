import { useEffect, useRef } from "react";

export const useScrollIntoView = <T extends HTMLElement>(shouldScroll: boolean) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (shouldScroll) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [shouldScroll]);

  return ref;
};
