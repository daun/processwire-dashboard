# Panel Type: PageList

Display a ProcessPageList widget.

![PageList](../images/page-list.png ':size=400')

## Options

- `parent`: the root page to render the page list for (Page object, ID or selector, homepage by default)
- `showRootPage`: whether to include the root page in the output (bool, `true` by default)
- `editMode`: how to open edit links (string, `none` for same window, `blank` for new tab or `modal`)
- `viewMode`: how to open view links (same options as `editMode`)

## Example

```php
[
  'parent' => 'template=info',
  'showRootPage' => true,
  'editMode' => 'modal',
]
```
