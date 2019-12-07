import moment from 'moment'

export const formatDate = (date = new Date()) => {
  return moment(date).format('YYYY-MM-DD')
}

export const formatDateDetailed = (date = new Date()) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
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
