import { date } from 'quasar'

const { formatDate } = date;

export const toDate = (date) => formatDate(date,'YYYY-MM-DD')
export const toTime = (date) => formatDate(date,'YYYY-MM-DD HH:mm')
export const getCurrentDate = () => toTime(new Date());
