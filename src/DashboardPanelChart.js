/* global Chart, $ */

import setChartJSDefaults, { applyDefaultsToChartConfig } from './charts/chartjs-defaults';
import { registerColorThemePlugin, setDefaultColorTheme } from './charts/color-themes';

function initChart($canvas) {
  const instance = $canvas.data('chart-instance');
  if (instance) return instance;

  const config = $canvas.data('chart');
  const theme = $canvas.data('theme');
  const defaultTheme = $canvas.data('default-theme');
  setDefaultColorTheme(defaultTheme);
  applyDefaultsToChartConfig(config);
  config.theme = theme;

  const chart = new Chart($canvas, config);

  $canvas.data('chart-instance', chart);
  $canvas.attr('data-setup', true);

  return chart;
}

function updateChart($canvas, $update) {
  const chart = $canvas.data('chart-instance') || initChart($canvas);
  const config = $update.data('chart');
  applyDefaultsToChartConfig(config);

  chart.config.data = config.data;
  chart.options = config.options;
  chart.update();
}

function initPanel($panel) {
  $panel.find('canvas').each((_, canvas) => {
    initChart($(canvas));
  });
}

function updatePanel($panel, $new) {
  const $canvasses = $panel.find('canvas');
  const $updates = $new.find('canvas');
  $canvasses.each((index, canvas) => {
    updateChart($(canvas), $updates.eq(index));
  });
}

/* Initialize defaults and plugins */
setChartJSDefaults();
registerColorThemePlugin();

/* Initialize new panels */
$(document).on('dashboard:panel(chart)', (event, { $element }) => {
  initPanel($element);
});

/* Cancel any auto-reloads and update chart manually */
$(document).on('dashboard:reload(chart)', (event, { $element, $new }) => {
  event.preventDefault();
  updatePanel($element, $new);
});
