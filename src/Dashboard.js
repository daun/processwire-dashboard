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
      this.triggerPanelReadyEvent($(panel));
    });
    this.triggerDashboardReadyEvent();

    this.setupAutoReload();
  }

  getPanelByKey(key) {
    return this.$panels.filter(`[data-key='${key}']`).first();
  }

  triggerDashboardReadyEvent() {
    $(document).trigger('dashboard:ready');
  }

  triggerPanelReadyEvent($panel) {
    const key = parseInt($panel.data('key'), 10);
    const panelType = $panel.data('panel');
    const reload = (animate = false) => this.reloadPanel(key, animate);
    const data = {
      key,
      panel: panelType,
      $element: $panel,
      reload,
    };
    $(document).trigger('dashboard:panel', [data]);
  }

  setupAutoReload() {
    this.$panels.each((_, panel) => {
      const $panel = $(panel);
      const key = parseInt($panel.data('key'), 10);
      let interval = parseInt($panel.data('interval'), 10);

      if (key >= 0 && interval > 0) {
        interval = Math.max(2000, interval);
        setInterval(() => {
          this.reloadPanel(key);
        }, interval);
      }
    });
  }

  reloadPanel(key, animate = false) {
    const $panel = this.getPanelByKey(key);
    if (!$panel) return;

    const panel = $panel.data('panel');
    const request = {
      key,
      panel,
    };

    $.post(this.url, request)
      .done((data) => {
        const $new = $(data);
        const update = () => {
          $panel.html($new.html());
          $panel.prop('className', $new.prop('className'));
          setupTooltips($panel);
          this.triggerPanelReadyEvent($panel);
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
