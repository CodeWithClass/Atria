import _ from 'lodash'

export const bpPredict = (data: Array<object>) => {
  return {
    measurement: {
      pid: _.random(1221226674, 8321226674),
      date: '',
      diastolic:
        parseInt(data[0]['measurement']['diastolic']) +
        (parseInt(data[0]['measurement']['diastolic']) -
          parseInt(data[1]['measurement']['diastolic'])),
      systolic:
        parseInt(data[0]['measurement']['systolic']) +
        (parseInt(data[0]['measurement']['systolic']) -
          parseInt(data[1]['measurement']['systolic'])),
      hr:
        parseInt(data[0]['measurement']['hr']) +
        (parseInt(data[0]['measurement']['hr']) -
          parseInt(data[1]['measurement']['hr']))
    }
  }
}
