
# Tabs

Panels can be grouped in tabs, hiding them until the tab is clicked.

```php
/* Create tab and add panels */
$tab = $panels->createTab(['title' => 'Pages']);
$tab->add(['panel' => 'page-list', 'data' => []]);
$panels->add($tab);

/* Repeat for additional tabs */
$tab = $panels->createTab(['title' => 'Analytics']);
$tab->add(['panel' => 'chart', 'data' => []]);
$panels->add($tab);
```

## Options

Required parameters are marked with an asterisk `*`

|   Parameter   |   Type   | Default |     Description     |
| ------------- | -------- | ------- | ------------------- |
| **`title *`** | `string` |         | Clickable tab label |
