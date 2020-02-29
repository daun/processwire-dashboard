/* global $, ProcessWire */

const selectors = {
  pageList: '.PageListContainerPage, .PageListContainerRoot',
  editLink: '.PageListActionEdit a, .PageListActionNew a',
  viewLink: '.PageListActionView a',
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

function setupEvents($panel) {
  const $pagelist = $panel.find(selectors.pageList);
  const editMode = $panel.data('edit-mode');
  const viewMode = $panel.data('view-mode');

  // Edit mode
  if (editMode === 'blank') {
    makeLinksOpenInNewTab($pagelist, selectors.editLink);
  }
  if (editMode === 'modal') {
    makeLinksOpenInModal($pagelist, selectors.editLink);
  }
  // View mode
  if (viewMode === 'blank') {
    makeLinksOpenInNewTab($pagelist, selectors.viewLink);
  }
  if (viewMode === 'modal') {
    makeLinksOpenInModal($pagelist, selectors.viewLink);
  }

  $pagelist.on('pw-modal-closed', selectors.editLink, () => {
    $panel.trigger('reload', { animate: true });
  });
}

function initPanel($panel) {
  // Get options from panel element
  const $pagelist = $panel.find(selectors.pageList);
  const parent = parseInt($panel.data('parent'), 10);
  const showRoot = $panel.data('show-root');
  // Defer to ProcessWire PageList component
  $pagelist.ProcessPageList({
    rootPageID: parent,
    showRootPage: showRoot,
  });
  // Register events after (hopefully) pagelist is loaded
  setTimeout(() => {
    setupEvents($panel);
  }, 1000);
}

$(document).on('dashboard:panel(page-list)', (event, { $element }) => {
  initPanel($element);
});
