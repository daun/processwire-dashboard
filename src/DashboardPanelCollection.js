/* global $ */

function initPanel($panel, reloadPanel) {
  const $reloadlinks = $panel.find('.pw-modal[data-reload-on-close]');
  if ($reloadlinks.length) {
    $reloadlinks.on('pw-modal-closed', () => {
      reloadPanel(true);
    });
  }
}

$(document).on('dashboard:panel', (event, { panel, $element, reload }) => {
  if (panel === 'collection') {
    initPanel($element, reload);
  }
});
