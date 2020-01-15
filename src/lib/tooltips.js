/* global $, UIkit */

function setupDefaultTooltips(context) {
  /* eslint-disable func-names */
  $('a.tooltip, .pw-tooltip', context).tooltip({
    position: {
      my: 'center bottom', // bottom-20
      at: 'center top',
    },
  }).hover(function () {
    const $a = $(this);
    if ($a.is('a')) {
      $a.addClass('ui-state-hover');
    }
    else {
      $a.data('pw-tooltip-cursor', $a.css('cursor'));
      $a.css('cursor', 'pointer');
    }
    $a.addClass('pw-tooltip-hover');
    $a.css('cursor', 'pointer');
  }, function () {
    const $a = $(this);
    $a.removeClass('pw-tooltip-hover ui-state-hover');
    if (!$a.is('a')) {
      $a.css('cursor', $a.data('pw-tooltip-cursor'));
    }
  });
}

function setupUiKitTooltips(context) {
  /* eslint-disable func-names */
  $('.tooltip, .pw-tooltip', context).each(function () {
    $(this).removeClass('tooltip pw-tooltip');
    UIkit.tooltip($(this));
  });
}

export default function setupTooltips(context = document) {
  if (typeof UIkit !== 'undefined') {
    setupUiKitTooltips(context);
  } else {
    setupDefaultTooltips(context);
  }
}
