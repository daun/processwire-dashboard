# Panel Type: Collection

Display a collection of pages in a table. Supply either a PageArray or a selector string.

![Collection](../images/collection.png ':size=400')

## Options

- `collection`: PageArray or selector string (required)
- `columns`: columns to display (array, `title` and `url` by default)
- `actions`: array of actions to allow, or `false` to disable Actions column (`edit` and `view` by default)
- `pagination`: display pagination info if PageArray has a `limit` set? (bool, `true` by default)
- `sortable`: make table columns sortable (bool, `false` by default)
- `showHeaders`: show table headers? (bool, `true` by default)
- `dateFormat`: date format to use for DateTime columns (`relative` by default)
- `maxImageNum`: number of thumbnails to show for image columns (`1` by default)

## Example

```php
[
  'collection' => 'template=news-item, limit=10',
  'sortable' => true,
  'columns' => [
      'title' => 'Title',
      'url' => 'URL',
      'modified' => 'Modified',
  ],
]
```

## Complex markup

Columns support dot syntax and curly brackets to access sub-fields:

```php
'columns' => [
  'category.title' => 'Category',
  'createdUser.name' => 'Created by',
  'On {location.street} in {location.city}' => 'Location',
]
```

## Image columns

Pass the name of any image field as the column key to display thumbnails. Only the first image is shown by default, but you can change the number of images shown by setting the `maxImageNum` option.

```php
[
  'columns' => [
      'images' => 'Thumbnails',
  ],
  'maxImageNum' => 4,
]
```

## Page icon columns

Add the column `page_icon` to display page icons in their own column.

```php
'columns' => [
  'page_icon' => ''
]
```

## Icon as table header

To display an icon as table header, pass the FontAwesome icon code as column title (including the `fa-` prefix).

```php
'columns' => [
  'thumbnail' => 'fa-eye'
]
```
