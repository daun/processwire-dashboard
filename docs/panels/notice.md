# Panel Type: Notice

Display a notice with icon and actions. If set, the panel's title will be displayed inline and in bold instead of inside a panel header.

![Notice](../images/notice.png ':size=400')

## Options

Required parameters are marked with an asterisk `*`

|    Parameter    |   Type   | Default  |                            Description                             |
| --------------- | -------- | -------- | ------------------------------------------------------------------ |
| **`message *`** | `string` |          | Notice to display                                                  |
| `status`        | `string` | `notice` | Status of the notice: `notice`, `success`, `warning` or `error`    |
| `actions`       | `array`  | `[]`     | Additional links to display (array of format `['Label' => 'url']`) |

## Example

```php
$panels->add([
  'panel' => 'notice',
  'title' => 'Welcome',
  'icon' => 'inbox',
  'data' => [
    'message' => 'You have <b>15</b> new messages.',
    'status' => 'success',
    'actions' => [
      'See all' => '/inbox/'
    ]
  ]
]);
```
