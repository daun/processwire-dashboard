/* global Chart, $ */

import setChartJSDefaults from './charts/chartjs-defaults';
import { registerColorThemePlugin, setDefaultColorTheme } from './charts/color-themes';

function initDashboardCharts() {
  const $charts = $('.DashboardPanelChart__canvas:not([data-setup])');
  $charts.each((_, canvas) => {
    const $canvas = $(canvas);
    const config = $canvas.data('chart');
    const theme = $canvas.data('theme');
    const defaultTheme = $canvas.data('default-theme');
    setDefaultColorTheme(defaultTheme);
    config.theme = theme;

    // eslint-disable-next-line no-unused-vars
    const chart = new Chart($canvas, config);
    $canvas.attr('data-setup', true);
  });
}

setChartJSDefaults();
registerColorThemePlugin();

$(() => {
  initDashboardCharts();
});

$(document).on('dashboard:panelReady', () => {
  initDashboardCharts();
});
