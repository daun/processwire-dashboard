
# Panel Type: Shortcuts

Display a list of shortcuts as links with icons. In list view, the page summary is displayed next to the title.

![Shortcuts](../images/shortcuts-comparison.png ':size=600')

## Options

- `shortcuts`: array of shortcuts (Page, page ID, selector or URL; use key to override title) (required)
- `display`: how to display the shortcuts: `grid` or `list` (`grid` by default)
- `fallbackIcon`: icon to use if page doesn't have one (string, `bookmark-o` by default)
- `icon`: force one icon for all pages (string, off by default)
- `checkAccess`: only show pages the current user has access to (bool, `true` by default)

To use a custom icon for a shortcut, pass an array as shortcut where the first item is the shortcut and the second item is the icon code. To set a custom summary, pass a third array item.

## Example

```php
[
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
  'checkAccess' => false,
]
```
