import { type Item, type Total, type Period } from '../types'

export const getTotals = (
  periods: Period[],
  period: number,
  items: Item[]
): Total => {
  const dolarValue = periods.find((i) => i.id === period)?.dolarValue
  const pesosValue = items.reduce((sum, item) => sum + item.amount, 0)
  return {
    pesos: pesosValue,
    dolar:
      dolarValue !== undefined
        ? Number((pesosValue / dolarValue).toFixed(2))
        : pesosValue
  }
}
