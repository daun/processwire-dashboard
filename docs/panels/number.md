# Panel Type: Number

Display a large number with trend indicator.

<img src="../images/number.png" width="300">

## Options

- `number`: the number to display (string or int/float, required)
- `detail`: additional information to display below (string)
- `trend`: trend to indicate with green/red arrows (string, either `up` or `down`)
- `locale`: locale to use for formatting numbers (string)

## Example

```php
[
  'number' => 484,
  'detail' => 'up 5% from last week',
  'trend' => 'up',
]
```
