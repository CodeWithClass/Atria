import moment from 'moment'

export const ageValidation = (_dob: any) => {
  const age = moment().diff(_dob, 'years', false)
  if (age > 1 && age < 121) return true
  return false
}

export const dobValidation = (_dob: string) => {
  const age = moment().diff(_dob, 'years')
  return ageValidation(age)
}

export const weightValidation = (_weight: any) => {
  const weight = parseInt(_weight)
  if (weight > 9 && weight < 601) return true
  return false
}

export const nameValidation = (name: string) => {
  if (name.length > 0 && name.length < 31) return true
  return false
}

export const calorieValidation = (_cal: any) => {
  const cal = parseInt(_cal)
  if (cal > 499 && cal < 20001) return true
  return false
}

export const notBlank = (val: string) => {
  if (val === '') return false
  return true
}
