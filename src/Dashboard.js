/* global $ */

import setupTooltips from './lib/tooltips';

class Dashboard {
  constructor() {
    this.selectors = {
      panel: '[data-dashboard-panel]',
    };
  }

  init() {
    this.url = document.location.pathname;
    this.$panels = $(this.selectors.panel);

    this.$panels.each((_, panel) => {
      this.setupPanel($(panel));
    });

    this.setupReloadEvents();
    this.setupAutoReload();

    this.triggerDashboardReadyEvent();
  }

  getPanelByKey(key) {
    return this.$panels.filter(`[data-key='${key}']`).first();
  }

  triggerDashboardReadyEvent() {
    $(document).trigger('dashboard:ready');
  }

  setupPanel($panel, isReload = false) {
    if (isReload) {
      setupTooltips($panel);
    }

    const key = parseInt($panel.data('key'), 10);
    const panel = $panel.data('panel');
    const data = {
      $element: $panel,
      key,
      panel,
    };
    $(document).trigger('dashboard:panel', [data]);
    $(document).trigger(`dashboard:panel(${panel})`, [data]);
  }

  setupReloadEvents() {
    $(document).on('reload', this.selectors.panel, (event, { animate } = {}) => {
      this.reloadPanel($(event.target), animate);
    });
  }

  setupAutoReload() {
    this.$panels.each((_, panel) => {
      const $panel = $(panel);
      const key = parseInt($panel.data('key'), 10);
      let interval = parseInt($panel.data('interval'), 10);

      if (key >= 0 && interval > 0) {
        interval = Math.max(2000, interval);
        setInterval(() => {
          $panel.trigger('reload');
        }, interval);
      }
    });
  }

  reloadPanel($panel, animate = false) {
    if (!$panel.length) return;

    const key = parseInt($panel.data('key'), 10);
    const panel = $panel.data('panel');
    const request = {
      key,
      panel,
    };

    $.post(this.url, request, null, 'text')
      .done((data) => {
        const $new = $(data);
        const update = () => {
          $panel.html($new.html());
          $panel.prop('className', $new.prop('className'));
          $new.filter('script').each((_, script) => {
            $.globalEval(script.text || script.textContent || script.innerHTML || '');
          });
          this.setupPanel($panel, true);
        };
        if (animate) {
          $panel.children().fadeOut(400, () => {
            update();
            $panel.children().fadeIn(400);
          });
        }
        else {
          update();
        }
      })
      .fail(() => {
        console.error('Error fetching panel contents');
      });
  }
}

$(() => {
  const dashboard = new Dashboard();
  dashboard.init();
});
