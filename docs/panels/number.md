# Panel Type: Number

Display a large number with trend indicator.

![Number](../images/number.png ':size=300')

## Options

Required parameters are marked with an asterisk `*`

|   Parameter    |           Type           |    Default    |                       Description                       |
| -------------- | ------------------------ | ------------- | ------------------------------------------------------- |
| **`number *`** | `int`, `float`, `string` |               | The number to display                                   |
| `detail`       | `string`                 |               | Additional information to display below                 |
| `trend`        | `string`                 |               | Trend to indicate with green/red arrows: `up` or `down` |
| `locale`       | `string`                 | server locale | Locale to use for formatting integers or floats         |

## Example

```php
$panels->add([
  'panel' => 'number',
  'title' => 'Number',
  'data' => [
    'number' => 484,
    'detail' => 'up 5% from last week',
    'trend' => 'up'
  ]
]);
```
