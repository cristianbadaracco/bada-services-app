import { type Period, type PeriodToSelect } from '../types'
import { months } from '../constants'

export const getIdFromDate = (periods: Period[], date: string): number => {
  const targetDate = new Date(date)

  for (const period of periods) {
    const startDate = new Date(period.startDate)

    if (
      targetDate.getMonth() === startDate.getMonth() &&
      targetDate.getFullYear() === startDate.getFullYear()
    ) {
      return period.id
    }
  }

  return -1
}

export const getNameFromMonth = (month: number): string => {
  if (month < 1 || month > 12) {
    throw new Error(
      'Invalid month number. Month number must be between 1 and 12.'
    )
  }

  return months[month - 1]
}

export const getSelectName = (date: string): string => {
  const [month, , year] = date.split('/')
  const monthName = months[parseInt(month, 10) - 1]
  return `${monthName} ${year.slice(-2)}`
}

export const formatPeriods = (periods: Period[]): PeriodToSelect[] => {
  return periods.map(({ id, startDate }) => {
    return { value: id, name: getSelectName(startDate) }
  })
}
