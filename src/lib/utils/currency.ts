export function formatCurrency(
  amount: number,
  locale = "en-IN",
  currency?: string,
) {
  if (currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount);
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
