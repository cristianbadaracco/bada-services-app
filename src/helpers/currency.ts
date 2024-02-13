export const formatNumberToCurrency = (value: number): string => {
  return `$ ${new Intl.NumberFormat('de-DE').format(value)}`
}
