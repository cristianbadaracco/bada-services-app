import { useState, useEffect } from 'react'

import { type Payment } from '../types'
import { getPayments } from '../store/actions/payments'

export const usePayment = (): {
  payments: Payment[]
  fetchPayments: () => void
} => {
  const [payments, setPayments] = useState<Payment[]>([])

  const fetchPayments = (): void => {
    getPayments()
      .then((payments: Payment[]) => {
        setPayments(payments)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  return { payments, fetchPayments }
}
