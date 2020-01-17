/* global $ */

const selectors = {
  pageList: '.PageListContainerPage',
  editLink: '.PageListActionEdit a, .PageListActionNew a',
  viewLink: '.PageListActionView a',
  isEditModeBlank: '.edit-mode--blank',
  isEditModeModal: '.edit-mode--modal',
  isViewModeBlank: '.view-mode--blank',
  isViewModeModal: '.view-mode--modal',
};

function makeLinksOpenInNewTab($container, selector) {
  $container.on('mouseenter', selector, (event) => {
    $(event.target).attr('target', '_blank');
  });
}

function makeLinksOpenInModal($container, selector) {
  $container.on('click', '.pw-modal-longclick', function handleModalClick(event) {
    if ($(this).is(selector)) {
      $(this).trigger('longclick');
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

function initPanel($panel) {
  const $pagelist = $panel.find(selectors.pageList);

  // Edit mode
  if ($panel.is(selectors.isEditModeBlank)) {
    makeLinksOpenInNewTab($pagelist, selectors.editLink);
  }
  if ($panel.is(selectors.isEditModeModal)) {
    makeLinksOpenInModal($pagelist, selectors.editLink);
  }
  // View mode
  if ($panel.is(selectors.isViewModeBlank)) {
    makeLinksOpenInNewTab($pagelist, selectors.viewLink);
  }
  if ($panel.is(selectors.isViewModeModal)) {
    makeLinksOpenInModal($pagelist, selectors.viewLink);
  }

  $pagelist.on('pw-modal-closed', selectors.editLink, () => {
    $panel.trigger('reload', { animate: true });
  });
}

$(document).on('dashboard:panel(page-list)', (event, { $element }) => {
  initPanel($element);
});
