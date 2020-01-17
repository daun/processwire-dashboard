/* global Chart, $ */

import setChartJSDefaults from './charts/chartjs-defaults';
import { registerColorThemePlugin, setDefaultColorTheme } from './charts/color-themes';

function initChart(canvas) {
  const $canvas = $(canvas);
  if (($canvas).data('setup')) return;
  const config = $canvas.data('chart');
  const theme = $canvas.data('theme');
  const defaultTheme = $canvas.data('default-theme');
  setDefaultColorTheme(defaultTheme);
  config.theme = theme;

  // eslint-disable-next-line no-unused-vars
  const chart = new Chart($canvas, config);

  $canvas.attr('data-setup', true);
}

function initPanel($panel) {
  const $canvases = $panel.find('canvas');
  $canvases.each((_, canvas) => {
    initChart(canvas);
  });
}

setChartJSDefaults();
registerColorThemePlugin();

$(document).on('dashboard:panel(chart)', (event, { $element }) => {
  initPanel($element);
});
