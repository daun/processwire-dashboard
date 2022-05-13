/* global $ */

function initPanel($panel) {
  const $reloadlinks = $panel.find('.pw-modal[data-reload-on-close]');
  if ($reloadlinks.length) {
    $reloadlinks.on('pw-modal-closed', () => {
      $panel.trigger('reload', { animate: true });
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

  const $actionInputs = $panel.find('input[name^="actions["]');
  if ($actionInputs.length) {
    $actionInputs.on('change', (event) => {
      event.preventDefault();
      const name = event.target.name;
      const checked = event.target.checked;
      const value = checked ? 1 : '';
      const params = { [name]: value };
      $panel.trigger('reload', { animate: false, params });
    });
  }
}

$(document).on('dashboard:panel(collection)', (event, { $element }) => {
  initPanel($element);
});
