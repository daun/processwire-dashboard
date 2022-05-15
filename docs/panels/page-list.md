# Panel Type: PageList

Display a ProcessPageList widget.

![PageList](../images/page-list.png ':size=400')

## Options

|   Parameter    |          Type           | Default  |                                   Description                                   |
| -------------- | ----------------------- | -------- | ------------------------------------------------------------------------------- |
| `parent`       | `Page`, `int`, `string` | Homepage | Root page to render the page list for (Page, ID or selector)                    |
| `showRootPage` | `bool`                  | `true`   | Include the root page in the output?                                            |
| `editMode`     | `string`                | `blank`  | How to open edit links (`none` for same window, `blank` for new tab or `modal`) |
| `viewMode`     | `string`                | `blank`  | How to open view links (same options as `editMode`)                             |

## Example

```php
$panels->add([
  'panel' => 'page-list',
  'title' => 'Page list',
  'data' => [
    'parent' => 'template=info',
    'showRootPage' => true,
    'editMode' => 'modal'
  ]
]);
```
