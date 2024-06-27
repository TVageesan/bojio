import { date } from 'quasar'

const { formatDate, addToDate } = date;

export const toDate = (date) => formatDate(date,'YYYY-MM-DD')
export const toTime = (date) => formatDate(date,'YYYY-MM-DD HH:mm')
export const toTimePlusHour = (date) => toTime(addToDate(date,{hours: 1}));
export const getCurrentDate = () => toTime(new Date());
export const toTimeRange = (start_time,end_time) => {
  {
    console.log(start_time,end_time);
    const start = new Date(start_time);
    const end = new Date(end_time);

    console.log('start',start,'end',end);

    const dayOfWeek = formatDate(start, 'dddd'); // Full name of the day
    const monthName = formatDate(start, 'MMMM'); // Full name of the month
    const day = formatDate(start, 'DD'); // Day of the month

    // Format start and end time
    const formattedStartTime = formatDate(start, 'h:mma'); // 10:00am
    const formattedEndTime = formatDate(end, 'h:mma'); // 2:00pm

    return `${dayOfWeek}, ${monthName} ${day} | ${formattedStartTime} - ${formattedEndTime}`;
  }
}
