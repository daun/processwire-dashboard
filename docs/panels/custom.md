
# Custom Panels

While the easiest way to create custom panels is simply [rendering a template file](/panels/template.md), the module aims to be easily extendable with custom panel types.

To create custom panels, simply extend the `DashboardPanel` base class.

See [DashboardPanelHelloWorld](https://github.com/daun/processwire-dashboard/blob/master/DashboardPanelHelloWorld.module) or take a look at the [Third-party panels](/panels/third-party.md) for example implementations.

## Naming

Class names in `PascalCase` are translated to panel names in `kebab-case`.

- Module name: `DashboardPanelHelloWorld`
- Panel name: `hello-world`

## Class interface

Every panel module **must** implement the `getContent()` method that returns the rendered markup for the panel body. Everything else is optional.

- `setup()`: called before rendering to fetch data, setup variables, etc.
- `getContent()`: returns the panel's body markup (required, string)
- `getTitle()`: returns the panel's title (string)
- `getIcon()`: returns an icon code to display next to the title (string)
- `getFooter()`: returns the rendered markup for the panel footer (string)
- `getClassNames()`: returns additional class names for the panel div (array)
- `getAttributes()`: returns HTML attributes for the panel card (array of `attr => value`)
- `getStylesheets()`: returns stylesheets to load (array of filenames or URLs)
- `getScripts()`: returns scripts to load (array of filenames or URLs)
- `getInterval()`: returns the interval at which the panel is reloaded via AJAX (integer, milliseconds)

## Accessing config & data

Every module derived from the `DashboardPanel` base class has a few properties populated automatically:

- `$this->options`: Global panel options like title, icon, etc (array)
- `$this->data`: Panel-specific configuration (array)
- `$this->size`: Panel size (string, sanitized to one of allowed values)
- `$this->style`: Style options of this panel instance (array)

## Module assets

Module assets will be included automatically as long as they're named accordingly (`DashboardPanelHelloWorld.css` and `DashboardPanelHelloWorld.js` respectively).

## Markup

Panels are generated as UiKit cards with a header, body and footer. This is a simplified version of what is rendered for each panel:

```html
<div class="Dashboard__panel DashboardPanelHelloWorld uk-card">
  <div class="uk-card-header">
    <h3 class="uk-card-title">
      Hello World
    </h3>
  </div>
  <div class="uk-card-body">
    <p>Nothing to see here</p>
  </div>
  <div class="uk-card-footer">
    Goodbye World
  </div>
</div>
```

## Styling

Namespace your CSS to make sure you're targeting your custom panel type only.

```css
.DashboardPanelHelloWorld .uk-card-body {
  font-style: italic;
}
```

## Initialize panels with JS

If you need to run JavaScript to initialize a panel, you can listen for the `dashboard:panel` event that is fired whenever a panel is loaded (or reloaded via AJAX). The event receives a data object with two relevant properties: `$element` is the panel DOM element as a jQuery object and `panel` is the panel type.

```js
/* Listen to ready event of new 'hello-world' panels */
$(document).on('dashboard:panel(hello-world)', (event, { $element }) => {
  /* Initialize the panel */
});
```

See [DashboardPanelHelloWorld.js](https://github.com/daun/processwire-dashboard/blob/master/src/DashboardPanelHelloWorld.js) for an example implementation.

## Reload panels

To reload a panel via AJAX, trigger a `reload` event on the panel object.

```js
/* Instant reload */
$panel.trigger('reload');

/* Fade transition */
$panel.trigger('reload', { animate: true });
```

### Post params

To pass data from JS to the PHP panels class, pass a `params` option that will be sent as POST data.

```js
/* Send data from JS */
$panel.trigger('reload', { params: { page: 4 } });
```

```php
/* Access data from PHP */
$page = $_POST['page'] ?? 1;
```

## Markup helpers

The panel class has a few helpers to render common markup categories.

### Tables

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

### Icons

`DashboardPanel::renderIcon($icon)`

Render a FontAwesome icon in fixed width.

```php
$icon = $this->renderIcon('star');
```

### Views

`DashboardPanel::view($view, $variables = [])`

Render a template file in a `views` sub-directory relative to the module file. Passes all ProcessWire API variables as well as user-supplied variables.

```php
/* Render ./views/content.php and pass a $title var */

$markup = $this->view('content', [
  'title' => 'Lorem ipsum'
]);
```
