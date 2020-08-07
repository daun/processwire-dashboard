/* global $ */

const selectors = {
  pageList: '.PageListContainerPage, .PageListContainerRoot',
  editLink: '.PageListActionEdit a, .PageListActionNew a',
  viewLink: '.PageListActionView a',
};

function setLinkMode($container, selector, mode) {
  $container.on('mouseenter', selector, (event) => {
    if (mode === 'blank') {
      $(event.target).attr('target', '_blank');
    }
    if (mode === 'modal') {
      $(event.target).addClass('pw-modal');
      $(event.target).addClass('pw-modal-large');
      $(event.target).removeClass('pw-modal-longclick');
    }
  });
}
function setupEvents($panel) {
  const $pagelist = $panel.find(selectors.pageList);
  const editMode = $panel.data('edit-mode');
  const viewMode = $panel.data('view-mode');

  if ($pagelist.data('has-events')) {
    return;
  }

  // Set link modes for editing and viewing
  setLinkMode($pagelist, selectors.editLink, editMode);
  setLinkMode($pagelist, selectors.viewLink, viewMode);

  // Reload page list when panel is closed
  $pagelist.on('pw-modal-closed', selectors.editLink, () => {
    $panel.trigger('reload', { animate: true });
  });

  $pagelist.data('has-events', true);
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
