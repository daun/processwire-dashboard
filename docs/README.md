# ProcessWire Dashboard

[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/philippdaun/processwire-dashboard?color=97aab4&label=version)](https://github.com/philippdaun/processwire-dashboard/releases) 
[![ProcessWire version](https://img.shields.io/badge/ProcessWire-%3E%3D%203.0.148-97aab4)](https://processwire.com/download/core/) 
[![GitHub License](https://img.shields.io/github/license/philippdaun/processwire-dashboard?color=97aab4)](./LICENSE) 
[![GitHub (Pre-)Release Date](https://img.shields.io/github/release-date-pre/philippdaun/processwire-dashboard?label=updated)](https://github.com/philippdaun/processwire-dashboard/releases)

Display a configurable dashboard in ProcessWire's admin interface. Comes with a set of pre-defined panel types but can be extended easily to display any content you want.

## Creating Custom Panels

To create custom panels, simply extend the DashboardPanel base class. See [DashboardPanelHelloWorld](./DashboardPanelHelloWorld.module) for an example implementation.

Every panel module **must** implement the `getContent()` method that returns the rendered markup for the panel body. Everything else is optional.

- `setup()`: called before rendering to fetch data, setup variables, etc.
- `getContent()`: return the panel's body markup (required, string)
- `getTitle()`: return the panel's title (string)
- `getIcon()`: return an icon code to display next to the title (string)
- `getFooter()`: return the rendered markup for the panel footer (string)
- `getClassNames()`: return additional class names for the panel div (array)
- `getStyles()`: return styles to load (array of filenames or URLs)
- `getScripts()`: return scripts to load (array of filenames or URLs)

Module assets will be included automatically as long as they're named accordingly (`DashboardPanelHelloWorld.css` and `DashboardPanelHelloWorld.js` respectively).

### Accessing Config & Data

Every module derived from the DashboardPanel base class has a few properties populated automatically:

- `$this->options`: Global panel options like title, icon, etc (array)
- `$this->data`: Panel-specific configuration (array)
- `$this->size`: Panel size (string, sanitized to one of allowed values)
- `$this->style`: Style options of this panel instance (array)

### Helpers

The panel base class has a few helpers for common tasks.

#### DashboardPanel::renderTable

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

#### DashboardPanel::renderIcon

Render a FontAwesome icon in fixed width.

```php
$icon = $this->renderIcon('star');
```

#### DashboardPanel::view

Render a template file in a `views` sub-directory relative to the module file. Passes all ProcessWire API variables as well as user-supplied variables.

```php
/* Render ./views/content.php and pass a $title var */

$markup = $this->view('content', [
  'title' => 'Lorem ipsum'
]);
```

## Panel Groups

Panels can be displayed in a nested grid by creating groups. Each group can have a `title` and add extra `margin` below. To control vertical alignment inside the group, set the `align` property to one of `top`, `bottom`, `center`, `distribute` or `fill` (`fill` by default).

See further below for a screenshot and example code.

```php
/* Create a group */
$group = $panels->createGroup([
    'size'   => 'normal',
    'title'  => 'Notifications',
    'align'  => 'top',
    'margin' => true,
]);
$panels->add($group);

/* Nest panels below */
foreach (getNotifications() as $message) {
  $group->add([
    'panel' => 'notice',
    'size'  => 'full',
    'data'  => ['message' => $message],
  ]);
}
```

### Example Group Configuration

See the example below for a common group setup and the necessary code.

<img src="./images/groups.png">


```php
/* Create panel group: analytics */

$analytics = $panels->createGroup([
  'size'   => 'normal',
  'title'  => 'Visitor Stats',
  'margin' => true,
]);
$panels->add($analytics);

/* Add chart panels to group */

$analytics->add([
  'panel' => 'chart',
  'title' => 'Origin',
  'data'  => [ /* */ ],
]);
$analytics->add([
  'panel' => 'chart',
  'title' => 'Retention',
  'data'  => [ /* */ ],
]);

/* Create panel group: notices */

$notices = $panels->createGroup([
  'size'   => 'normal',
  'title'  => 'Notifications',
  'align'  => 'top',
  'margin' => true,
]);
$panels->add($notices);

/* Add notice panels to group */

$notices->add([
  'panel' => 'notice',
  'size'  => 'full',
  'title' => 'Good job!',
  'data'  => [ /* */ ],
]);

$notices->add([
  'panel' => 'notice',
  'size'  => 'full',
  'title' => 'Hint:',
  'data'  => [ /* */ ],
]);

$notices->add([
  'panel' => 'notice',
  'size'  => 'full',
  'title' => 'Welcome back.',
  'data'  => [ /* */ ],
]);
```

## License

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

(See included LICENSE file for full license text.)
