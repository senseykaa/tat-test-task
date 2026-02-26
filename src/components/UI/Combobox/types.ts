import type { ReactNode } from "react";

export type ComboboxBaseOption = {
  id: string | number;
  label: string;
};

export type Props<TOption extends ComboboxBaseOption> = {
  value: TOption | null;
  options: TOption[];

  renderOption: (option: TOption, isActive: boolean) => ReactNode;
  onSelect: (option: TOption) => void;
  onSearch: (query: string) => void;
  onClear?: () => void;
  onOpen?: () => void;

  isLoading?: boolean;
  placeholder?: string;
};
