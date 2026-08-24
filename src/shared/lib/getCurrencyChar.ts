export const getCurrencyChar = (currency: string): string => {
  const map: Record<string, string> = {
    USD: '$',
    EUR: '€',
    RUB: '₽',
    // ...
  };
  return map[currency] ?? currency;
};