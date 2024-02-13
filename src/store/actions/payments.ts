import { paymentsUrl } from '../../constants.ts'
import { type Payment } from '../../types'

export const getPayments = async (): Promise<Payment[]> => {
  try {
    const response = await fetch(paymentsUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`)
    }

    const data: Payment[] = await response.json()
    return data
  } catch (error) {
    console.error('service error', error)
    throw new Error('Failed to fetch payments')
  }
}
