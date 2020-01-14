
# Custom Panels

While the easiest way to create custom panels is simply [rendering a template file](/panels/template.md), the module aims to be easily extendable with custom panel types.

To create custom panels, simply extend the `DashboardPanel` base class.

See [DashboardPanelHelloWorld](https://github.com/philippdaun/processwire-dashboard/blob/master/DashboardPanelHelloWorld.module) for an example implementation.

## Class Interface

Every panel module **must** implement the `getContent()` method that returns the rendered markup for the panel body. Everything else is optional.

- `setup()`: called before rendering to fetch data, setup variables, etc.
- `getContent()`: return the panel's body markup (required, string)
- `getTitle()`: return the panel's title (string)
- `getIcon()`: return an icon code to display next to the title (string)
- `getFooter()`: return the rendered markup for the panel footer (string)
- `getClassNames()`: return additional class names for the panel div (array)
- `getStyles()`: return styles to load (array of filenames or URLs)
- `getScripts()`: return scripts to load (array of filenames or URLs)

## Accessing Config & Data

Every module derived from the `DashboardPanel` base class has a few properties populated automatically:

- `$this->options`: Global panel options like title, icon, etc (array)
- `$this->data`: Panel-specific configuration (array)
- `$this->size`: Panel size (string, sanitized to one of allowed values)
- `$this->style`: Style options of this panel instance (array)

## Module assets

Module assets will be included automatically as long as they're named accordingly (`DashboardPanelHelloWorld.css` and `DashboardPanelHelloWorld.js` respectively).

## Helpers

The panel class has a few helpers for common tasks.

### Render Tables

`DashboardPanel::renderTable($rows, $options = [])`

Render a table using ProcessWire's built-in `MarkupAdminDataTable` module. Returns HTML.

If the `header` option is true, the first row will be displayed as a header row. Same for `footer`.

```php
/* Usage with default values */

$rows = [
  ['Title', 'Date'],
  ['Lorem ipsum', '1.12.2019'],
];

$html = $this->renderTable($rows, [
  'header'   => false,
  'footer'   => false,
  'entities' => false,
  'sortable' => false,
  'class'    => '',
]);
```

### Render Icons

`DashboardPanel::renderIcon($icon)`

Render a FontAwesome icon in fixed width.

```php
$icon = $this->renderIcon('star');
```

### Render Views

`DashboardPanel::view($view, $variables = [])`

Render a template file in a `views` sub-directory relative to the module file. Passes all ProcessWire API variables as well as user-supplied variables.

```php
/* Render ./views/content.php and pass a $title var */

$markup = $this->view('content', [
  'title' => 'Lorem ipsum'
]);
```
