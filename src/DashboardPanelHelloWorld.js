/* global $ */

function initPanel($panel) {
  const paragraphCount = $panel.find('p').length;
  console.log(`Hello world! I found ${paragraphCount} paragraph(s)`);

  /**
   * Reload the panel:
   * $panel.trigger('reload', { animate: true });
   */
}

$(document).on('dashboard:panel(hello-world)', (event, { $element }) => {
  initPanel($element);
});
