import { useEffect, useState } from 'react'

import { type PeriodToSelect, type Total, type Period } from '../../types'

import { useItem } from '../../hooks/useItem'
import { usePeriod } from '../../hooks/usePeriod'
import { useService } from '../../hooks/useService'
import { usePayment } from '../../hooks/usePayment'

import {
  getIdFromDate,
  getNameFromMonth,
  formatPeriods
} from '../../helpers/periods'
import { formatDate } from '../../helpers/date'
import { getTotals } from '../../helpers/items'
import { formatNumberToCurrency } from '../../helpers/currency'

import ServicesList from './ServicesList'

import './index.css'

const MonthlyFixedExpenses: React.FC = () => {
  const { periods } = usePeriod()
  const { items, fetchItems } = useItem()
  const { services } = useService()
  const { payments } = usePayment()

  const [currentPeriod, setCurrentPeriod] = useState<Period>({
    id: -1,
    dolarValue: 0,
    startDate: ''
  })
  const [currentTotals, setCurrentTotals] = useState<Total>({
    dolar: 0,
    pesos: 0
  })
  const [periodsToSelect, setPeriodsToSelect] = useState<PeriodToSelect[]>([])

  useEffect(() => {
    if (periods.length > 0) {
      const id = getIdFromDate(periods, formatDate(new Date()))
      if (id > 0) {
        const period = periods.find((i) => i.id === id)
        if (period) {
          setCurrentPeriod(period)
        }
      }
      setPeriodsToSelect(formatPeriods(periods))
    }
  }, [periods])

  useEffect(() => {
    if (currentPeriod && currentPeriod?.id > 0) {
      fetchItems(`periodId=${currentPeriod.id}`)
    }
  }, [currentPeriod])

  useEffect(() => {
    if (items.length > 0 && currentPeriod.id > 0) {
      setCurrentTotals(getTotals(periods, currentPeriod.id, items))
    }
  }, [items])

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target
    const period = periods.find((i) => i.id == +value)
    if (period) {
      setCurrentPeriod(period)
    }
    fetchItems(`periodId=${value}`)
  }

  return (
    <div>
      <h1>Gastos Fijos Mensuales</h1>
      <div id="items">
        {currentPeriod.id !== -1 && (
          <>
            {periodsToSelect.length > 0 && (
              <select
                name="periods"
                onChange={(event) => {
                  handleSelect(event)
                }}
              >
                {periodsToSelect.map(({ value, name }) => {
                  return (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  )
                })}
              </select>
            )}
            <h2>{getNameFromMonth(currentPeriod.id)}</h2>
            <ServicesList
              items={items}
              services={services}
              payments={payments}
              currentPeriod={currentPeriod}
            />
          </>
        )}
      </div>
      <div id="totals">
        <p>{`Total Pesos: ${formatNumberToCurrency(currentTotals.pesos)}`}</p>
        <p>{`Total Dolares: ${formatNumberToCurrency(currentTotals.dolar)}`}</p>
      </div>
    </div>
  )
}

export default MonthlyFixedExpenses
