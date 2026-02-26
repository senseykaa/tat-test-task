import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";

import { useGeoSearch } from "~/hooks/useGeoSearch";
import { useClearDestination, useDestination, useSetDestination } from "~/store/search/selectors";
import type { GeoOption as GeoOptionType } from "~/types/global";

import { Button } from "../UI/Button";
import { Combobox } from "../UI/Combobox";

import { GeoOption } from "./components/GeoOption";

import styles from "./styles.module.scss";

type Props = {
  onSubmit: () => void;
};

export const SearchDestinationForm = ({ onSubmit }: Props) => {
  const submitRef = useRef<HTMLButtonElement>(null);

  const { value: geoOptions, isLoading, setQuery } = useGeoSearch();

  const destination = useDestination();
  const setDestination = useSetDestination();
  const clearDestination = useClearDestination();

  const handleOpen = useCallback(() => {
    if (destination?.type === "country") {
      setQuery("");
    } else if (destination) {
      setQuery(destination.label);
    }
  }, [destination, setQuery]);

  const handleSubmit = useCallback(() => {
    if (!destination) return;

    onSubmit();
  }, [destination, onSubmit]);

  const onSelect = useCallback(
    (option: GeoOptionType) => {
      // ensure re-render is complete before we move focus to the submit button
      flushSync(() => {
        setDestination(option);
      });

      submitRef.current?.focus();
    },
    [setDestination],
  );

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>Форма пошуку турів</h2>

      <Combobox<GeoOptionType>
        value={destination}
        options={geoOptions}
        renderOption={(opt, isActive) => <GeoOption option={opt} isActive={isActive} />}
        onSelect={onSelect}
        onSearch={setQuery}
        onClear={clearDestination}
        onOpen={handleOpen}
        isLoading={isLoading}
        placeholder="Оберіть напрямок"
      />

      <Button ref={submitRef} onClick={handleSubmit} disabled={!destination}>
        Знайти
      </Button>
    </div>
  );
};
