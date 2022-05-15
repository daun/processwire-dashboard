# Panel Type: Collection

Display a collection of pages in a table. Supply either a PageArray or a selector string.

![Collection](../images/collection.png ':size=400')

## Options

Required parameters are marked with an asterisk `*`

|     Parameter      |         Type          |    Default     |                                   Description                                   |
| ------------------ | --------------------- | -------------- | ------------------------------------------------------------------------------- |
| **`collection *`** | `PageArray`, `string` |                | Collection of pages to show (or selector string)                                |
| `columns`          | `array`               | `title`, `url` | Columns to display                                                              |
| `sortable`         | `bool`                | `false`        | Make table columns sortable?                                                    |
| `actions`          | `array`, `bool`       | `view`, `edit` | Actions to allow: `view`, `edit`, `trash` (`false` to disable)                  |
| `editMode`         | `string`              | `blank`        | How to open edit links (`none` for same window, `blank` for new tab or `modal`) |
| `viewMode`         | `string`              | `blank`        | How to open view links (same options as `editMode`)                             |
| `pagination`       | `bool`                | `true`         | Display pagination links if collection has a `limit` set?                       |
| `headers`          | `bool`                | `true`         | Display table headers?                                                          |
| `emptyMessage`     | `string`              | —              | Placeholder to show if the collection is empty, i.e. no pages were found        |
| `dateFormat`       | `string`              | `relative`     | Format to use for DateTime columns                                              |
| `maxImageNum`      | `int`                 | `1`            | Number of thumbnails to show for image columns                                  |

## Example

```php
$panels->add([
  'panel' => 'collection',
  'title' => 'Pages',
  'data' => [
    'collection' => 'template=info, limit=10',
    'sortable' => true,
    'columns' => [
      'title',
      'url' => 'URL',
      'modified' => 'Modified'
    ]
  ]
]);
```

## Column headers

By default, the panel will guess the column header from the field label. If your
`title` field is called `Title`, this will be used as column header.

```php
'columns' => [
  'title'
]
```

To override a default header, use the array key as column name and the value as column header.

```php
'columns' => [
  'title' => 'El título'
]
```

To display no header for that column, pass an empty string.

```php
'columns' => [
  'title' => ''
]
```

To display an icon as header, pass a FontAwesome icon code (including the `fa-` prefix).

```php
'columns' => [
  'thumbnail' => 'fa-eye'
]
```

## Complex markup

Columns support dot syntax and curly brackets to access sub-fields:

```php
'columns' => [
  'category.title' => 'Category',
  'createdUser.name' => 'Created by',
  'On {location.street} in {location.city}' => 'Location'
]
```

## Image columns

Pass the name of any image field as the column key to display thumbnails. Only the first image is shown by default, but you can change the number of images shown by setting the `maxImageNum` option.

```php
[
  'columns' => [
      'images'
  ],
  'maxImageNum' => 4
]
```

## Page icon columns

Add the column `page_icon` to display page icons in their own column.

```php
'columns' => [
  'page_icon' => ''
]
```

## Reload after modal edits

When setting `editMode` to `modal`, the panel will reload its contents when the modal closes. Any changes made to the page will be visible immediately.
