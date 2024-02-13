import { servicesUrl } from '../../constants.ts'
import { type Service } from '../../types'

export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await fetch(servicesUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`)
    }

    const data: Service[] = await response.json()
    return data
  } catch (error) {
    console.error('service error', error)
    throw new Error('Failed to fetch services')
  }
}
