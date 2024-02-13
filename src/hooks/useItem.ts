import { useState, useEffect } from 'react'

import { getAllItems } from '../store/actions/items'

import { type Item } from '../types'

export const useItem = (): {
  items: Item[]
  fetchItems: (param: string) => void
} => {
  const [items, setItems] = useState<Item[]>([])

  const fetchItems = (param: string = ''): void => {
    getAllItems(param)
      .then((items: Item[]) => {
        setItems(items)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return { items, fetchItems }
}
