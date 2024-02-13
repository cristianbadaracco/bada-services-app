import { periodsUrl } from '../../constants.ts'
import { type Period } from '../../types'

export const getPeriods = async (): Promise<Period[]> => {
  try {
    const response = await fetch(periodsUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`)
    }

    const data: Period[] = await response.json()
    return data
  } catch (error) {
    console.error('service error', error)
    throw new Error('Failed to fetch Period')
  }
}
