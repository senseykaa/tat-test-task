import { type ChangeEvent, type KeyboardEvent, useCallback, useRef, useState } from "react";

import type { ComboboxBaseOption } from "../../types";

type Params<TOption extends ComboboxBaseOption> = {
  options: TOption[];

  onSelect: (option: TOption) => void;
  onSearch: (query: string) => void;
  onClear?: () => void;
  onOpen?: () => void;
};

export const useCombobox = <TOption extends ComboboxBaseOption>({
  options,
  onSelect,
  onSearch,
  onClear,
  onOpen,
}: Params<TOption>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setActiveIndex(-1);
    onOpen?.();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;

      setInputValue(query);
      onSearch(query);
      setIsOpen(true);
      setActiveIndex(-1);
    },
    [onSearch],
  );

  const handleSelect = useCallback(
    (option: TOption) => {
      setInputValue(option.label);
      onSelect(option);
      setIsOpen(false);
      setActiveIndex(-1);
    },
    [onSelect],
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    onSearch("");
    onClear?.();

    inputRef.current?.focus();
  }, [onSearch, onClear]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown": {
          if (!isOpen) return;

          e.preventDefault();

          setActiveIndex((prev) => Math.min(prev + 1, options.length - 1));

          break;
        }
        case "ArrowUp": {
          if (!isOpen) return;

          e.preventDefault();

          setActiveIndex((prev) => Math.max(prev - 1, -1));

          break;
        }
        case "Enter": {
          if (isOpen && activeIndex >= 0 && options[activeIndex]) {
            e.preventDefault();
            e.stopPropagation();

            handleSelect(options[activeIndex]);
          }

          break;
        }
        case "Escape": {
          if (isOpen) {
            e.preventDefault();

            handleClose();
          }

          break;
        }
      }
    },
    [isOpen, activeIndex, options, handleSelect, handleClose],
  );

  return {
    inputRef,
    isOpen,
    inputValue,
    activeIndex,
    handleOpen,
    handleClose,
    handleSelect,
    handleClear,
    onInputChange,
    onKeyDown,
  };
};
