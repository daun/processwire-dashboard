# Panels

## Configuration

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

## Included Panels

The module comes bundled with a set of pre-defined panel types. Click the images below for details about each panel type.

|Image|Panel|Class name|Content|
|---|---|---|---|
|[<img src="../images/chart.png" width="120">](/panels/chart.md)|`chart`|DashboardPanelChart|Chart.js chart|
|[<img src="../images/collection.png" width="120">](/panels/collection.md)|`collection`|DashboardPanelCollection|List of pages in a table|
|[<img src="../images/notice.png" width="120">](#notice)|`notice`|DashboardPanelNotice|Notification-style message|
|[<img src="../images/number.png" width="120">](#number)|`number`|DashboardPanelNumber|Large number with trend indicator|
|[<img src="../images/page-list.png" width="120">](#pagelist)|`page-list`|DashboardPanelPageList|ProcessPageList widget|
|[<img src="../images/shortcuts-grid.png" width="120">](#shortcuts)|`shortcuts`|DashboardPanelShortcuts|List of links with icons|
|[<img src="../images/template.png" width="120">](#template)|`template`|DashboardPanelTemplate|Render file in template folder|

### Notice

Display a notice with icon and actions. If set, the panel's `title` will be displayed inline and in bold instead of inside a panel header.

<img src="./images/notice.png" width="400">

#### Options

- `message`: notice to display (string, required)
- `status`: status of the notice (string: one of either `success`, `warning` or `error`; `notice` by default)
- `actions`: additional links to display (array of format `['Label' => 'url']`)

#### Example

```php
/* Plain with actions */
[
  'message' => 'You have <b>15</b> new messages.',
  'actions' => [
    'See all' => '/inbox/',
  ],
]

/* With status */
[
  'message' => 'Something went wrong.',
  'status' => 'error',
]
```

### Number

Display a large number with trend indicator.

<img src="./images/number.png" width="300">

#### Options

- `number`: the number to display (string or int/float, required)
- `detail`: additional information to display below (string)
- `trend`: trend to indicate with green/red arrows (string, either `up` or `down`)
- `locale`: locale to use for formatting numbers (string)

#### Example

```php
[
  'number' => 484,
  'detail' => 'up 5% from last week',
  'trend' => 'up',
]
```

### PageList

Display a ProcessPageList widget.

<img src="./images/page-list.png" width="400">

#### Options

- `parent`: the root page to render the page list for (Page object, ID or selector, homepage by default)
- `showRootPage`: whether to include the root page in the output (bool, `true` by default)

#### Example

```php
[
  'parent' => 'template=info',
  'showRootPage' => true,
]
```

### Shortcuts

Display a list of shortcuts as links with icons. In list view, the page summary is displayed next to the title.

<img src="./images/shortcuts-comparison.png" width="600">

#### Options

- `shortcuts`: array of shortcuts (Page, page ID, selector or URL; use key to override title) (required)
- `display`: how to display the shortcuts: `grid` or `list` (`grid` by default)
- `fallbackIcon`: icon to use if page doesn't have one (string, `bookmark-o` by default)
- `icon`: force one icon for all pages (string, off by default)
- `checkAccess`: only show pages the current user has access to (bool, `true` by default)

To use a custom icon for a shortcut, pass an array as shortcut where the first item is the shortcut and the second item is the icon code. To set a custom summary, pass a third array item.

#### Example

```php
[
  'shortcuts' => [
    1020,                          // Page ID
    $this->pages->get(1132),       // Page
    'template=news-item',          // Selector
    'Backups' => '/backup/',       // URL
    'Updates' => 1020,             // Override title
    [304, 'user'],                 // Override icon
    [304, 'user', 'Lorem ipsum'],  // Set summary
  ],
  'fallbackIcon' => 'star-o',
  'checkAccess' => false,
]
```

### Template

Display the output of any file in your template folder. The file will receive all API variables and any additional view variables you specify.

<img src="./images/template.png" width="400">

#### Options

- `template`: template file name, relative to `/site/templates/` and including extension (string, required)
- `variables`: variables to pass into the template (array, empty by default)

#### Example

```php
/* Panel config */
[
  'template' => 'dash.php',
  'variables' => [
    'text' => 'Lorem ipsum dolor ...',
  ],
]

/* Template file: site/templates/dash.php */

echo $text;
```
