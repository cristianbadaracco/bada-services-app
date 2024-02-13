export interface Item {
  id: string
  amount: number
  dueDate: string
  hasAutomaticPayment: boolean
  paymentAccountId: number
  paymentDate: string
  periodId: number
  serviceID: number
}

export interface Service {
  id: number
  name: string
}

export interface Payment {
  id: number
  name: string
  type: string
}

export interface Period {
  id: number
  dolarValue: number
  startDate: string
}

export interface PeriodToSelect {
  value: number
  name: string
}

export interface Total {
  dolar: number
  pesos: number
}
