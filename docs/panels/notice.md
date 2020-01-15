# Panel Type: Notice

Display a notice with icon and actions. If set, the panel's `title` will be displayed inline and in bold instead of inside a panel header.

![Notice](../images/notice.png ':size=400')

## Options

- `message`: notice to display (string, required)
- `status`: status of the notice (string: one of either `success`, `warning` or `error`; `notice` by default)
- `actions`: additional links to display (array of format `['Label' => 'url']`)

## Example

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
