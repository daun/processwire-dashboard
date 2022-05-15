
# Panel Type: Add New Page

Display a list of shortcuts for adding new pages.

The list of templates is derived from ProcessWire's core Add-New-Page dropdown.

![Shortcuts](../images/add-new.png ':size=400')

## Options

Required parameters are marked with an asterisk `*`

| Parameter |   Type   | Default |                  Description                   |
| --------- | -------- | ------- | ---------------------------------------------- |
| `display` | `string` | `list`  | How to display the links: `list` or `dropdown` |

## Example

```php
$panels->add([
  'panel' => 'add-new',
  'title' => 'Add New Page',
  'data' => [
    'display' => 'list'
  ]
]);
```
