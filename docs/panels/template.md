
# Panel Type: Template

Display the output of any file in your template folder. The file will receive all API variables and any additional view variables you specify.

![Template](../images/template.png ':size=400')

## Options

Required parameters are marked with an asterisk `*`

|    Parameter     |   Type   | Default |                                Description                                 |
| ---------------- | -------- | ------- | -------------------------------------------------------------------------- |
| **`template *`** | `string` |         | Template file name, relative to `/site/templates/` and including extension |
| `variables`      | `array`  | `[]`    | Data to pass into the template                                             |

## Example

The following configuration will include `/site/templates/dashboard/example.php`.

```php
$panels->add([
  'panel' => 'template',
  'title' => 'Template file',
  'data' => [
    'template' => 'dashboard/example.php',
    'variables' => [
      'text' => 'Lorem ipsum dolor ...'
    ]
  ]
]);
```

The specified template file will be rendered like any other ProcessWire template.

```php
/* site/templates/dashboard/example.php */

<p><?= $text ?></p>
```

## CSS and JS files

Scripts and stylesheets that match the template file name will be included automatically. For the example above, this would mean that `/site/templates/dashboard/example.css` and `*.js` will be included as well (if they exist).

## Namespacing

Each template panel has a `data-file` attribute that contains the exact filename of the template being rendered. You can use this attribute to namespace any custom styles or track down the DOM element via JS.

```css
/* Style panel by its template file */

.DashboardPanelTemplate[data-file="dashboard/example.php"] {
  color: red;
}
```

```js
/* Find a panel by its template file and initialize it */

$(document).on('dashboard:panel(template)', (event, { $element }) => {
  if ($element.data('file') === 'dashboard/example.php') {
    /* Initialize the panel */
  }
});
```
