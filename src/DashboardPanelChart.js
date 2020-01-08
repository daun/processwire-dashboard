/* global Chart */

const colorThemes = {
  dashboard: [
    'rgb(23, 185, 120)', // green
    'rgb(103, 114, 229)', // purple
    'rgb(219, 120, 221)', // pink
    'rgb(244, 190, 86)', // orange
    'rgb(35, 164, 240)', // blue
  ],
  airtable: [
    'rgb(8, 157, 88)', // green
    'rgb(168, 71, 189)', // purple
    'rgb(62, 134, 246)', // blue
    'rgb(217, 70, 55)', // red
    'rgb(240, 181, 0)', // yellow
  ],
  processwire: [
    'rgb(37, 128, 230)', // blue
    'rgb(233, 53, 97)', // red
    'rgb(69, 183, 151)', // green
    'rgb(28, 40, 53)', // dark blue
  ],
  processwire: [
    'rgb(37, 128, 230)', // blue
    'rgb(233, 53, 97)', // red
    'rgb(69, 183, 151)', // green
    'rgb(28, 40, 53)', // dark blue
    'rgb(141, 147, 158)', // gray
  ],
  reminders: [
    'rgb(92, 91, 231)', // blue
    'rgb(253, 71, 59)', // red
    'rgb(252, 160, 11)', // yellow
    'rgb(41, 209, 92)', // green
    'rgb(211, 128, 246)', // purple
  ],
  workflow: [
    'rgb(99, 142, 196)', // blue
    'rgb(68, 158, 135)', // green
    'rgb(186, 101, 192)', // purple
    'rgb(222, 83, 87)', // red
    'rgb(209, 151, 40)', // yellow
  ],
};

const defaultTheme = colorThemes.processwire;
let userTheme = defaultTheme;

function setGlobalChartJSConfig () {
  // Layout
  Chart.defaults.global.aspectRatio = 2.5;
  Chart.defaults.global.layout.padding = 5;

  // Scales
  Chart.defaults.scale.gridLines.drawBorder = false;
  Chart.defaults.scale.color = 'rgba(0, 0, 0, 0.07)';
  Chart.defaults.scale.zeroLineColor = 'rgba(0, 0, 0, 0.07)';
  Chart.defaults.scale.drawBorder = false;
  Chart.defaults.scale.ticks.beginAtZero = true;

  // Legends
  Chart.defaults.global.legend.position = 'bottom';
  Chart.defaults.global.legend.labels.fontColor = 'rgb(110, 110, 110)';
  Chart.defaults.global.legend.labels.usePointStyle = true;
  Chart.defaults.global.legend.labels.boxWidth = 4;

  // Tooltips
  Chart.defaults.global.tooltips.titleFontColor = 'rgb(53, 75, 96)';
  Chart.defaults.global.tooltips.backgroundColor = 'rgb(240, 243, 247)'; // white
  Chart.defaults.global.tooltips.bodyFontColor = 'rgba(53, 75, 96, 0.6)';
  Chart.defaults.global.tooltips.displayColors = false;
  Chart.defaults.global.tooltips.titleFontSize = 14;
  Chart.defaults.global.tooltips.bodyFontSize = 14;
  Chart.defaults.global.tooltips.cornerRadius = 4;
  Chart.defaults.global.tooltips.xPadding = 10;
  Chart.defaults.global.tooltips.yPadding = 10;

  // Lines
  Chart.defaults.global.elements.line.backgroundColor = 'transparent';
  Chart.defaults.global.elements.line.clip = 20;
  Chart.defaults.global.elements.line.borderWidth = 2;

  // Doughnuts & Arcs
  Chart.defaults.doughnut.cutoutPercentage = 75;
  Chart.defaults.global.elements.arc.borderWidth = 4;
  Chart.defaults.global.elements.arc.borderColor = 'white';
  Chart.defaults.global.elements.arc.hoverBorderColor = 'white';

  // Points
  Chart.defaults.global.elements.point.backgroundColor = 'white';
  Chart.defaults.global.elements.point.radius = 3;
  Chart.defaults.global.elements.point.hoverRadius = 4;
  Chart.defaults.global.elements.point.borderWidth = 2;
  Chart.defaults.global.elements.point.hoverBorderWidth = 2;
}

function initDashboardChart () {
  $charts = $('.DashboardPanelChart__canvas');
  $charts.each(function () {
    const $canvas = $(this);
    const config = $canvas.data('chart');
    const theme = $canvas.data('theme');
    userTheme = colorThemes[theme] || defaultTheme;

    const chart = new Chart($canvas, config);
  });
}

function pickChartColor(idx) {
  return userTheme[idx % userTheme.length];
}

Chart.pluginService.register({
  beforeUpdate(chart) {
    let colorIndex = 0;

    switch (chart.config.type) {

    case 'bar':
      chart.data.datasets.forEach((dataset, index) => {
        if (!dataset.borderColor) {
          dataset.borderColor = pickChartColor(index);
          if (!dataset.backgroundColor) {
            dataset.backgroundColor = dataset.borderColor;
          }
        }
      });
      break;

    case 'doughnut':
      chart.data.datasets.forEach((dataset) => {
        if (!dataset.backgroundColor) {
          const colorArray = dataset.data.map(() => pickChartColor(colorIndex++));
          dataset.backgroundColor = colorArray;
        }
        if (!dataset.borderColor) {
          dataset.borderColor = 'white';
        }
      });

    case 'line':
      chart.data.datasets.forEach((dataset, index) => {
        if (!dataset.borderColor) {
          dataset.borderColor = pickChartColor(index);
          if (!dataset.backgroundColor) {
            dataset.pointHoverBackgroundColor = dataset.borderColor;
          }
          if (!dataset.pointHoverBackgroundColor) {
            dataset.pointHoverBackgroundColor = dataset.borderColor;
          }
        }
      });
      break;

    default:
      //

    }
  }
});

$(function() {
  setGlobalChartJSConfig();
  initDashboardChart();
});
