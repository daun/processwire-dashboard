
# Panel Groups

Panels can be displayed in a nested grid by creating groups. Each group can have a title and add extra margin below.

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

## Options

| Parameter |   Type   | Default |                                                                       Description                                                                        |
| --------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`   | `string` |         | Heading displayed above the group                                                                                                                        |
| `margin`  | `bool`   | `false` | Add extra margin below the group                                                                                                                         |
| `align`   | `string` | `fill`  | Control vertical alignment of the panels inside the group: `top`, `bottom`, `center`, `distribute` (add space between) or `fill` (stretch to fill space) |

## Example configuration

See the example below for a common group setup and the necessary code.

![Groups](../images/groups.png)

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
