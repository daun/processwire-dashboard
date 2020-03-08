/* global Chart */

const themes = {
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

let defaultTheme = themes.processwire;

const setDefaultColorTheme = (name) => {
  defaultTheme = themes[name] || defaultTheme;
};

const color = (theme, index) => theme[index % theme.length];

const colorThemePlugin = {
  beforeUpdate(chart) {
    /* eslint-disable no-param-reassign */

    const theme = themes[chart.config.theme] || defaultTheme;

    switch (chart.config.type) {

    case 'bar':
      chart.data.datasets.forEach((dataset, index) => {
        if (!dataset.borderColor) {
          dataset.borderColor = color(theme, index);
          if (!dataset.backgroundColor) {
            dataset.backgroundColor = dataset.borderColor;
          }
        }
      });
      break;

    case 'line':
      chart.data.datasets.forEach((dataset, index) => {
        if (!dataset.borderColor) {
          dataset.borderColor = color(theme, index);
          if (!dataset.backgroundColor) {
            dataset.pointHoverBackgroundColor = dataset.borderColor;
          }
          if (!dataset.pointHoverBackgroundColor) {
            dataset.pointHoverBackgroundColor = dataset.borderColor;
          }
        }
      });
      break;

    case 'pies':
      chart.data.datasets.forEach((dataset) => {
        if (!dataset.backgroundColor) {
          const colorArray = dataset.data.map((_, index) => color(theme, index));
          dataset.backgroundColor = colorArray;
        }
        if (!dataset.borderColor) {
          dataset.borderColor = 'white';
        }
      });
      break;

    case 'doughnut':
      chart.data.datasets.forEach((dataset) => {
        if (!dataset.backgroundColor) {
          const colorArray = dataset.data.map((_, index) => color(theme, index));
          dataset.backgroundColor = colorArray;
        }
        if (!dataset.borderColor) {
          dataset.borderColor = 'white';
        }
      });
      break;

    default:
      //

    }
  },
};

const registerColorThemePlugin = () => {
  Chart.pluginService.register(colorThemePlugin);
};

export default themes;

export {
  themes,
  registerColorThemePlugin,
  setDefaultColorTheme,
};
