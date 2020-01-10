/* global $ */

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

    this.setupAutoRefresh();
  }

  getPanelByKey(key) {
    return this.$panels.filter(`[data-key='${key}']`).first();
  }

  triggerDashboardReadyEvent() {
    $(document).trigger('dashboard:ready');
  }

  triggerPanelReadyEvent($panel) {
    const panelType = $panel.data('panel');
    $(document).trigger('dashboard:panelReady', {
      $element: $panel,
      panel: panelType,
    });
  }

  setupAutoRefresh() {
    this.$panels.each((_, panel) => {
      const $panel = $(panel);
      const key = parseInt($panel.data('key'), 10);
      let interval = parseInt($panel.data('interval'), 10);

      if (key >= 0 && interval > 0) {
        interval = Math.max(2000, interval);
        setInterval(() => {
          this.refreshPanel(key);
        }, interval);
      }
    });
  }

  refreshPanel(key) {
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
        $panel.html($new.html());
        $panel.prop('className', $new.prop('className'));
        this.triggerPanelReadyEvent($panel);
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
