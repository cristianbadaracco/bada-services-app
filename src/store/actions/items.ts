import { itemsUrl } from '../../constants.ts'
import { type Item } from '../../types'

export const getAllItems = async (param: string): Promise<Item[]> => {
  try {
    const fetchUrl = param !== '' ? `${itemsUrl}?${param}` : itemsUrl
    const response = await fetch(fetchUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`)
    }

    const data: Item[] = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch items')
  }
}
