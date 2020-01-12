import moment from 'moment'

export const calcTDEE = (data: any) => {
  /*Mifflin = (10.m + 6.25h - 5.0a) + s
    m is mass in kg, h is height in cm, a is
     age in years, s is +5 for males and -151 
     for females*/
  const weight = parseInt(data.weight)
  const age = parseInt(data.age)
  const heightFeet = parseInt(data.heightFeet.replace(/\D/g, ''))
  const heightInches = parseInt(data.heightInches.replace(/\D/g, ''))
  const { gender, activityLevel, healthGoal } = data

  //convert to metric
  const heightcm = (heightFeet * 12 + heightInches) * 2.54
  const weightKg = weight / 2.2 //lbs to kg
  const genderInt = gender === 'Male' ? 5 : -151

  // prettier-ignore
  let TDEE: number = ((10*weightKg) + (6.25*heightcm) - (5*age)) + genderInt
  if (activityLevel === '5 - 7 days per week') TDEE = TDEE * 2
  if (activityLevel === '3 - 4 days per week') TDEE = TDEE * 1.6
  if (activityLevel === '1 - 2 days per week') TDEE = TDEE * 1.3
  return calcGoalCalories(TDEE, healthGoal)
}

const calcGoalCalories = (TDEE: number, healthGoal: string) => {
  if (healthGoal === 'Lose weight') return TDEE - 500
  if (healthGoal === 'Gain weight') return TDEE + 500
  return TDEE
}

export const calcAge = dob => {
  const age = moment().diff(dob, 'years', false)
  return age
}
