
# Panel Groups

Panels can be displayed in a nested grid by creating groups. Each group can have a `title` and add extra `margin` below. To control vertical alignment inside the group, set the `align` property to one of `top`, `bottom`, `center`, `distribute` or `fill` (`fill` by default).

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

## Example Configuration

See the example below for a common group setup and the necessary code.

<img src="../images/groups.png">

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
