import { formatDate, daysBetweenDates } from '../../../helpers/date'

import {
  type Item,
  type Service,
  type Payment,
  type Period
} from '../../../types'

import Table from '../../../components/Table'

const ServicesList = ({
  items,
  services,
  payments,
  currentPeriod
}: {
  items: Item[]
  services: Service[]
  payments: Payment[]
  currentPeriod: Period
}) => {
  if (!items || !services || !payments || !currentPeriod) return

  return (
    <div className="services-list">
      <Table />
      <div className="service-item">
        <div>SERVICIO</div>
        <div>IMPORTE</div>
        <div>IMPORTE DOLAR</div>
        <div>VENCIMIENTO</div>
        <div>PAGO</div>
        <div>DIAS</div>
        <div>CUENTA</div>
        <div>DIAS FALTANTES</div>
        <div>AUTOMATICO</div>
      </div>
      {items.map(
        (
          {
            serviceID,
            amount,
            dueDate,
            paymentDate,
            paymentAccountId,
            hasAutomaticPayment
          },
          index
        ) => {
          const serviceName = services
            ? services.find((i) => i.id == serviceID)?.name
            : '-'
          const paymentName = payments
            ? payments.find((i) => i.id == paymentAccountId)?.name
            : '-'
          const days = paymentDate
            ? daysBetweenDates(dueDate, paymentDate)
            : '-'
          const missingDays = daysBetweenDates(dueDate, formatDate(new Date()))
          return (
            <div key={index} className="service-item">
              <div>{serviceName}</div>
              <div>{amount > 0 ? `$${amount}` : '-'}</div>
              <div>
                {amount > 0
                  ? `$${(amount / currentPeriod.dolarValue).toFixed(2)}`
                  : '-'}
              </div>
              <div>{dueDate ? dueDate : '-'}</div>
              <div>{paymentDate ? paymentDate : '-'}</div>
              <div>{days}</div>
              <div>{paymentName}</div>
              <div>{missingDays}</div>
              <div>
                <input type="checkbox" checked={hasAutomaticPayment} readOnly />
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}

export default ServicesList
