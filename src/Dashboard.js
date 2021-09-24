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

  triggerPanelReadyEvent($panel) {
    return this.triggerPanelEvent($panel, 'panel');
  }

  triggerPanelEvent($panel, event, additionalData = {}) {
    const key = parseInt($panel.data('key'), 10);
    const panel = $panel.data('panel');
    const data = {
      $element: $panel,
      key,
      panel,
      ...additionalData,
    };

    /* Trigger events and collect info on whether it was cancelled in a handler */
    const generalEvent = $.Event(`dashboard:${event}`);
    const namespacedEvent = $.Event(`dashboard:${event}(${panel})`);
    $(document).trigger(generalEvent, [data]);
    $(document).trigger(namespacedEvent, [data]);

    const prevented = generalEvent.isDefaultPrevented() || namespacedEvent.isDefaultPrevented();
    return !prevented;
  }

  setupPanel($panel, isReload = false) {
    if (isReload) {
      setupTooltips($panel);
    }
    this.triggerPanelReadyEvent($panel);
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
      dashboard: 1,
      key,
      panel,
    };

    $.post(this.url, request, null, 'text')
      .done((data) => {
        const $new = $(data);

        // Abort if any event handlers cancelled this reload
        const reloadEventAllowed = this.triggerPanelEvent($panel, 'reload', { $new });
        if (!reloadEventAllowed) {
          return;
        }

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
