import { date } from 'quasar'

const { formatDate, addToDate } = date;

export const toDate = (date) => formatDate(date,'YYYY-MM-DD')
export const toTime = (date) => formatDate(date,'YYYY-MM-DD HH:mm')
export const toTimePlusHour = (date) => toTime(addToDate(date,{hours: 1}));
export const getCurrentDate = () => toTime(new Date());
