import { Input } from "../Input";
import { Popover } from "../Popover";

import { useCombobox } from "./hooks/useCombobox";
import type { ComboboxBaseOption, Props } from "./types";

import styles from "./styles.module.scss";

export const Combobox = <TOption extends ComboboxBaseOption>({
  value,
  options,
  onSelect,
  onSearch,
  renderOption,
  onOpen,
  isLoading = false,
  placeholder,
  onClear,
}: Props<TOption>) => {
  const {
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
  } = useCombobox({ options, onSelect, onSearch, onClear, onOpen });

  const displayValue = isOpen ? inputValue : value ? value.label : inputValue;

  return (
    <Popover
      isOpen={isOpen}
      onClose={handleClose}
      anchor={
        <Input
          ref={inputRef}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-activedescendant={
            activeIndex >= 0 ? `option-${options[activeIndex]?.id}` : undefined
          }
          aria-autocomplete="list"
          value={displayValue}
          onChange={onInputChange}
          onFocus={handleOpen}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          suffix={
            value &&
            !isOpen && (
              <button
                className={styles.clear}
                onClick={handleClear}
                type="button"
                aria-label="Очистити"
              >
                x
              </button>
            )
          }
          autoComplete="off"
        />
      }
    >
      <ul className={styles.list} role="listbox">
        {isLoading && <li className={styles.message}>Завантаження...</li>}

        {!isLoading && options.length === 0 && (
          <li className={styles.message}>Нічого не знайдено</li>
        )}

        {!isLoading &&
          options.map((option, index) => (
            <li
              key={option.id}
              id={`option-${option.id}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();

                handleSelect(option);
              }}
            >
              {renderOption(option, index === activeIndex)}
            </li>
          ))}
      </ul>
    </Popover>
  );
};
