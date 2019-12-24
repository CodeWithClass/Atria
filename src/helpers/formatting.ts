import moment from 'moment'

export const formatDate = (date = new Date()) => {
  return moment(date).format('YYYY-MM-DD')
}
export const formatDateShort = (date: any = new Date()) => {
  return moment(date).format('MMM, DD')
}
export const formatDateDetailed = (date = new Date()) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export const timeAmPm = (time = new Date()) => {
  return moment(time).format('H:mm:ss A')
}
export const timeTravel = (date, pastORpresent) => {
  if (pastORpresent === 'past')
    return moment(date)
      .subtract(1, 'day')
      .format('YYYY-MM-DD')
  if (pastORpresent === 'future')
    return moment(date)
      .add(1, 'day')
      .format('YYYY-MM-DD')
}

export const formatMinutes = totalMins => {
  const hrs = Math.floor(totalMins / 60)
  const mins = totalMins % 60
  return [hrs, mins]
}
