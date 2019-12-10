export const sleepChartProperties: object = {
  // public sleepChartLabels: string[] = ['Deep Sleep', 'Light Sleep', 'Wake Sleep'];

  chartType: 'pie',
  colors: [
    {
      backgroundColor: [
        'rgba(167,72,195,0.8)',
        'rgba(110,89,201,0.8)',
        'rgba(85,173,224,0.8)'
      ]
    }
  ],
  optionsSP: {
    responsive: true,
    maintainAspectRatio: false,
    // cutoutPercentage: 60,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    legend: {
      labels: { fontColor: 'white', fontSize: 16 },
      position: 'right'
    }
  },
  optionsHP: {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    legend: {
      labels: { fontColor: 'white', fontSize: 16 },
      position: 'bottom'
    },
    tooltips: {
      enabled: true
    }
  },
  labels: ['Asleep', 'Restless', 'Awake']
}

export const bpChartProperties: object = {
  type: 'line',
  legend: true,
  labels: ['Earlier', 'Previous', 'Current', 'Predicted'],

  options: {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'white'
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: 'white'
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: 'white',
            stepSize: 20
          }
        }
      ]
    }
  },

  colors: [
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },

    {
      // grey
      backgroundColor: 'rgba(256,256,256,0.8)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ]
}
