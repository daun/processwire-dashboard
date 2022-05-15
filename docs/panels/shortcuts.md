
# Panel Type: Shortcuts

Display a list of shortcuts as links with icons. In list view, the page summary is displayed next to the title.

![Shortcuts](../images/shortcuts-comparison.png ':size=600')

## Options

Required parameters are marked with an asterisk `*`

|     Parameter     |   Type   |   Default    |                           Description                            |
| ----------------- | -------- | ------------ | ---------------------------------------------------------------- |
| **`shortcuts *`** | `array`  |              | Shortcuts to display: Page objects, page IDs, selectors and URLs |
| `display`         | `string` | `grid`       | How to display the shortcuts: `grid` or `list`                   |
| `summaries`       | `bool`   | `true`       | Whether to display summaries                                     |
| `fallbackIcon`    | `string` | `bookmark-o` | Icon to use if page doesn't have one                             |
| `icon`            | `string` | none         | Icon to uniformly use for **all** pages                          |
| `checkAccess`     | `bool`   | `true`       | Only show pages the user has access to                           |

See the example below on how to customize the icon, title, summary and URL for each shortcut.

## Example

```php
$panels->add([
  'panel' => 'shortcuts',
  'title' => 'Shortcuts',
  'data' => [
    'shortcuts' => [
      1020,                          // Page ID
      $this->pages->get(1132),       // Page
      'template=news-item',          // Selector
      'Backups' => '/backup/',       // URL
      'Updates' => 1020,             // Override title
      [304, 'user'],                 // Override icon
      [304, 'user', 'Lorem ipsum'],  // Set summary
    ],
    'fallbackIcon' => 'star-o',
    'checkAccess' => false
  ]
]);
```
