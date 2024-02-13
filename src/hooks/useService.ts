import { useState, useEffect } from 'react'

import { type Service } from '../types'
import { getServices } from '../store/actions/services'

export const useService = (): { services: Service[] } => {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    getServices()
      .then((services: Service[]) => {
        setServices(services)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return { services }
}
