export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit'
  })
}

export const daysBetweenDates = (dateFrom: string, dateTo: string): number => {
  const fromDate = new Date(dateFrom)
  const toDate = new Date(dateTo)

  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    return -1
  }

  const differenceMilliseconds = Math.abs(toDate.getTime() - fromDate.getTime())
  return Math.ceil(differenceMilliseconds / (1000 * 60 * 60 * 24))
}
