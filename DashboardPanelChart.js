/* global Chart */

var defaultChartColors = [
  'rgb(23, 185, 120)', // green
  'rgb(103, 114, 229)', // purple
  'rgb(219, 120, 221)', // pink
  'rgb(244, 190, 86)', // orange
  'rgb(35, 164, 240)', // blue
];

function setGlobalChartJSConfig () {
  // Layout
  Chart.defaults.global.aspectRatio = 2.5;
  Chart.defaults.global.layout.padding = 5;

  // Scales
  // Chart.defaults.scale.gridLines.display = false;
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

  // Points
  Chart.defaults.global.elements.point.backgroundColor = 'white';
  Chart.defaults.global.elements.point.radius = 3;
  Chart.defaults.global.elements.point.hoverRadius = 4;
  Chart.defaults.global.elements.point.borderWidth = 2;
  Chart.defaults.global.elements.point.hoverBorderWidth = 2;
}

function initDashboardChart () {
  var $canvas = $('#DashboardPanelChart__Canvas');
  if (!$canvas.length) return;

  var config = $canvas.data('chart');
  var chart = new Chart($canvas, config);
}

function pickDefaultChartColor(idx) {
  return defaultChartColors[idx % defaultChartColors.length];
}

Chart.pluginService.register({
  beforeUpdate(chart) {
    switch (chart.config.type) {
    case 'bar': {
      var datasetNum = chart.data.datasets.length;
      var datasetIndex = 0;
      var barIndex = 0;
      for (var dataset of chart.data.datasets) {
        if (datasetNum > 1) {
          if (!dataset.borderColor) {
            dataset.borderColor = pickDefaultChartColor(datasetIndex++);
            if (!dataset.backgroundColor) {
              dataset.backgroundColor = dataset.borderColor;
            }
          }
        }
        else {
          if (!dataset.borderColor) {
            // Option 1: all bars of same color
            dataset.borderColor = pickDefaultChartColor(datasetIndex++);

            // Option 2: all bars of differing colors
            // const borderColor = [];
            // for (const _d of dataset.data) {
            //   borderColor.push(pickDefaultChartColor(barIndex++));
            // }
            // dataset.borderColor = borderColor;

            if (!dataset.backgroundColor) {
              dataset.backgroundColor = dataset.borderColor;
            }
          }
        }
      }
      break;
    }
    case 'line': {
      var datasetIndex = 0;
      for (var dataset of chart.data.datasets) {
        if (!dataset.borderColor) {
          dataset.borderColor = pickDefaultChartColor(datasetIndex++);
          if (!dataset.backgroundColor) {
            dataset.pointHoverBackgroundColor = dataset.borderColor;
          }
          if (!dataset.pointHoverBackgroundColor) {
            dataset.pointHoverBackgroundColor = dataset.borderColor;
          }
        }
      }
      break;
    }
    default: {
      //
    }
    }
  },
});

$(function() {
  setGlobalChartJSConfig();
  initDashboardChart();
});
