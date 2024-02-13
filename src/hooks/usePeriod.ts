import { useState, useEffect } from 'react'

import { type Period } from '../types'
import { getPeriods } from '../store/actions/periods'

export const usePeriod = (): { periods: Period[] } => {
  const [periods, setPeriods] = useState<Period[]>([])

  useEffect(() => {
    getPeriods()
      .then((periods: Period[]) => {
        setPeriods(periods)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return { periods }
}
