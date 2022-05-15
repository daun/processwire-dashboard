/* global $ */

function initPanel($panel) {
  const $reloadlinks = $panel.find('.pw-modal[data-reload-on-close]');
  if ($reloadlinks.length) {
    const page = $panel.data('page') || 1;
    const params = { page };
    $reloadlinks.on('pw-modal-closed', () => {
      $panel.trigger('reload', { animate: false, params });
    });
  }

  const $paginationLinks = $panel.find('a[data-pagination]');
  if ($paginationLinks.length) {
    $paginationLinks.on('click', (event) => {
      event.preventDefault();
      const url = event.currentTarget.href;
      const page = (url.match(/\d+$/) || [])[0] || 1;
      const params = { page };
      $panel.data('page', page);
      $panel.trigger('reload', { animate: false, params });
    });
  }

  const $actionButtons = $panel.find('a[data-action]');
  if ($actionButtons.length) {
    $actionButtons.on('click', (event) => {
      event.preventDefault();
      const action = event.currentTarget.dataset.action;
      const key = `actions${action}`
      const value = event.currentTarget.dataset.actionValue;
      const params = { [key]: value };
      $panel.trigger('reload', { animate: false, params });
    });
  }
}

$(document).on('dashboard:panel(collection)', (event, { $element }) => {
  initPanel($element);
});
