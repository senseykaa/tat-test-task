// 1500, "usd" -> "1 500 $"
export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(amount);
};
