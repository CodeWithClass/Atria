export const sleepChartProperties: object = {
  // public sleepChartLabels: string[] = ['Deep Sleep', 'Light Sleep', 'Wake Sleep'];

  chartTypeS: 'doughnut',
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
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0
      }
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
      display: false
    },
    tooltips: {
      enabled: false
    }
  }
}
