/* global $ */

function initPanel($panel) {
  const $reloadlinks = $panel.find('.pw-modal[data-reload-on-close]');
  if ($reloadlinks.length) {
    $reloadlinks.on('pw-modal-closed', () => {
      $panel.trigger('reload', { animate: true });
    });
  }
}

$(document).on('dashboard:panel(collection)', (event, { $element }) => {
  initPanel($element);
});
