/* global $ */

import setupTooltips from './lib/tooltips';

class Dashboard {
  constructor() {
    this.selectors = {
      panel: '[data-dashboard-panel]',
      tabs: '[data-dashboard-tabs]',
      tabLink: '[data-dashboard-tab]',
    };
  }

  init() {
    this.url = document.location.pathname + document.location.search;
    this.$panels = $(this.selectors.panel);
    this.$tabs = $(this.selectors.tabs);

    this.$panels.each((_, panel) => {
      this.setupPanel($(panel));
    });

    this.$tabs.each((_, tabs) => {
      this.setupTabs($(tabs));
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

  setupTabs($tabs) {
    const $links = $tabs.find(this.selectors.tabLink);

    const toggleActive = (link, state) => {
      const contentId = $(link).attr('href');
      $(link).attr('aria-current', state ? 'true' : 'false')
      $(contentId).attr('aria-hidden', state ? 'false' : 'true')
    }

    const setActiveLink = (activeLink) => {
      $links.each((_, inactiveLink) => toggleActive(inactiveLink, false));
      toggleActive(activeLink, true);
    }

    setActiveLink($links.eq(0));

    $links.on('click', (event) => {
      event.preventDefault();
      setActiveLink(event.target);
    });

    $tabs.attr('data-cloak', null);
  }

  setupPanel($panel, isReload = false) {
    if (isReload) {
      setupTooltips($panel);
    }
    this.triggerPanelReadyEvent($panel);
  }

  setupReloadEvents() {
    $(document).on('reload', this.selectors.panel, (event, { animate, params } = {}) => {
      this.reloadPanel($(event.target), { animate, params });
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

  reloadPanel($panel, { animate = false, params = null } = {}) {
    if (!$panel.length) return;

    const key = parseInt($panel.data('key'), 10);
    const panel = $panel.data('panel');
    const request = {
      dashboard: 1,
      key,
      panel,
      ...(params || {})
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
