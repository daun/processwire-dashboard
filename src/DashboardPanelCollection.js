/* global $ */

function initPanel($panel, refreshPanel) {
  const $refreshlinks = $panel.find('.pw-modal[data-refresh]');
  if ($refreshlinks.length) {
    $refreshlinks.on('pw-modal-closed', () => {
      refreshPanel(true);
    });
  }
}

$(document).on('dashboard:panel', (event, { panel, $element, refresh }) => {
  if (panel === 'collection') {
    initPanel($element, refresh);
  }
});
