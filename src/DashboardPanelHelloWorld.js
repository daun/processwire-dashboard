/* global $ */

function initPanel($panel, reloadPanel) {
  const paragraphCount = $panel.find('p').length;
  console.log(`Hello world! I found ${paragraphCount} paragraph(s)`);

  /* Reload the panel: reloadPanel(); */
}

$(document).on('dashboard:panel', (event, { panel, $element, reload }) => {
  if (panel === 'hello-world') {
    initPanel($element, reload);
  }
});
