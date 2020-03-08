/* global Chart */

import get from 'lodash/get'
import set from 'lodash/set'

export default function setGlobalChartJSDefaults() {
  // Layout
  Chart.defaults.global.animation.duration = 0;
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
  Chart.defaults.global.legend.labels.boxWidthByChartType = { doughnut: 4, pie: 8 };

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

export function applyDefaultsToChartConfig (config) {
  const type = config.type;
  const labelWidth = get(config, 'options.legend.labels.boxWidth')
  if (!labelWidth) {
    const defaultLabelWidth = Chart.defaults.global.legend.labels.boxWidth
    const chartLabelWidth = Chart.defaults.global.legend.labels.boxWidthByChartType[type] || defaultLabelWidth
    set(config, 'options.legend.labels.boxWidth', chartLabelWidth)
  }
}
