import { format } from 'date-fns'
import { enIN } from 'date-fns/locale'

const TZ_IN = { locale: enIN } // Timezone India

const formatDate = (date: Date | number | string) => {
  return format(new Date(date), 'dd-MM-yyyy', TZ_IN)
}

const formatDateTime = (date: Date | number | string) => {
  return format(new Date(date), 'dd-MM-yyyy HH:mm:ss', TZ_IN)
}

const formatDateSystem = (date: Date | number | string) => {
  return format(new Date(date), 'yyyy-MM-dd', TZ_IN)
}

const formatDateTimeSystem = (date: Date | number | string) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss', TZ_IN)
}

const formatMonth = (date: Date | number | string) => {
  return format(new Date(date), 'MMMM', TZ_IN)
}

const formatYear = (date: Date | number | string) => {
  return format(new Date(date), 'yyyy', TZ_IN)
}

const formatTime = (date: Date | number | string) => {
  return format(new Date(date), 'HH:mm:ss', TZ_IN)
}

export {
  formatDate,
  formatDateSystem,
  formatDateTime,
  formatDateTimeSystem,
  formatMonth,
  formatYear,
  formatTime,
}
