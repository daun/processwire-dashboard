/* global $ */

function initPanel($panel) {

  const submitParamsAndReload = (params) => {
    $panel.trigger('reload', { animate: false, params });
  };

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
      $panel.data('page', page);
      submitParamsAndReload({ page });
    });
  }

  const $actionButtons = $panel.find('a[data-action]');
  if ($actionButtons.length) {
    $actionButtons.on('click', (event) => {
      event.preventDefault();
      const action = event.currentTarget.dataset.action;
      const confirm = event.currentTarget.dataset.actionConfirm;
      const key = `actions${action}`
      const value = event.currentTarget.dataset.actionValue;
      const params = { [key]: value };
      console.log(confirm);
      if (confirm) {
        ProcessWire.confirm(confirm, () => submitParamsAndReload(params));
      } else {
        submitParamsAndReload(params);
      }
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
      submitParamsAndReload(params);
    });
  }
}

$(document).on('dashboard:panel(collection)', (event, { $element }) => {
  initPanel($element);
});
