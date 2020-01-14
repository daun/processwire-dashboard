# Getting started

## Installation

Please check the [requirements](requirements.md) to make sure you version of ProcessWire is supported.

Install the module by either copying the folder into your `/site/modules/` directory or installing it via the admin interface.

Upon installation, a dashboard page is created. To access the dashboard, users need to have the permission `dashboard-view`.

You can optionally [display the Dashboard as the main entry point](configuration.md#dashboard-as-entry-point) after login.

## Adding Panels

Panels are added via a hook. The method's return value is a `WireArray`, which means you can just `add()` your panels.

```php
/* site/templates/admin.php */

wire()->addHookAfter('Dashboard::getPanels', function ($event) {
  /* Get list of panels */
  $panels = $event->return;

  /* Add panels */
  $panels->add([
    'panel' => 'collection',
    'title' => 'News items',
    'data' => [
      'collection' => 'template=news-item, limit=10',
      'sortable' => true,
    ],
  ]);
});

/* Make sure to add the hook *before* the default admin process */
require $config->paths->adminTemplates . 'controller.php';
```

## Removing panels

Since the panel collection is a WireArray, you can filter and remove existing panels in later hooks.

```php
/* Remove all chart panels */
$charts = $panels->find('panel=chart');
foreach ($charts as $panel) {
  $panels->remove($panel);
}
```

## Nesting panels

See the section [Panel Groups](#panel-groups) for information about grouping and nesting panels.
