# Getting started

## Installation

?> Please check the [requirements](requirements.md) to make sure your version of ProcessWire is supported.

Install the module from the [module directory](https://modules.processwire.com/modules/dashboard/) or by manually moving the module's source folder into your installation's module folder at `/site/modules/`.

## Accessing the dashboard

A new dashboard page is created when you first install the module. Accessing it requires the permission `dashboard-view` or superuser status. A link to the dashboard page is added to the user dropdown menu where supported by the admin theme.

You can optionally [display the Dashboard as the main entry point](configuration.md#dashboard-as-entry-point) after login.

## Adding panels

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

## Grouping panels

Panels can be displayed and nested in sections as well as grouped in tabs. See the sections about [tabs](/panels/tabs.md) and [groups](/panels/groups.md) for more information.

## Configuring panels

Each panel configuration is a simple associative array holding the following global configuration keys. The only required option is `panel`. Each panel might additionally require one or more keys in the `data` array to display correctly.

- `panel`: The panel type (string, required)
- `size`: The width of the panel (string, default: `normal`)
  - `mini`: one quarter
  - `small`: one third
  - `normal`: half
  - `large`: two thirds
  - `full`: full width
- `style`: an associative array of display options
  - `centerTitle`: Center the panel's title (bool, `false` by default)
  - `minimal`: Display the panel without background, border and shadow (bool, `false` by default)
  - `padding`: Display the panel contents with padding (bool, `true` by default)
- `title`: Title displayed in the panel header (set to empty string to hide header completely)
- `icon`: Icon displayed in the panel header \* (FontAwesome code without leading `fa-`)
- `data`: The data required by the panel type. See the readme section on each panel for information about required keys.

\* Panel icons are hidden by default. See the section on [enabling display of panel icons](configuration.md#enable-panel-icons).

```php
/* Example using all options */

$panels->add([

  /* Global options */
  'panel' => 'collection',
  'size'  => 'full',
  'style' => ['centerTitle' => true],
  'title' => 'News items',
  'icon'  => 'newspaper-o',

  /* Options specific to each panel type */
  'data' => [
    'collection' => 'template=news-item, limit=10',
    'sortable'   => true,
  ],

]);
```
