# Panel Type: Collection

Display a collection of pages in a table. Supply either a PageArray or a selector string.

![Collection](../images/collection.png ':size=400')

## Options

Required options are marked with an asterisk `*`

|Name|Description|Type|Default|
|---|---|---|---|
|**`collection *`**|Collection of pages to show|`PageArray` or selector string||
|`columns`|Columns to display|`array`|`title` & `url`|
|`sortable`|Make table columns sortable?|`bool`|`false`|
|`actions`|Actions to allow (`false` to disable)|`array`, `bool`|`edit` & `view`|
|`editMode`|How to open edit links (`none` for same window, `blank` for new tab or `modal`)|`string`|`blank`|
|`viewMode`|How to open view links (same options as `editMode`)|`string`|`blank`|
|`pagination`|Display pagination info if collection has a `limit` set?|`bool`|`true`|
|`headers`|Display table headers?|`bool`|`true`|
|`dateFormat`|Format to use for DateTime columns|`string`|`relative`|
|`maxImageNum`|Number of thumbnails to show for image columns|`int`|`1`|

- `collection`: PageArray or selector string (required)
- `columns`: columns to display (array, `title` and `url` by default)
- `actions`: array of actions to allow, or `false` to disable Actions column (`edit` and `view` by default)
- `pagination`: display pagination info if PageArray has a `limit` set? (bool, `true` by default)
- `sortable`: make table columns sortable (bool, `false` by default)
- `headers`: show table headers? (bool, `true` by default)
- `dateFormat`: date format to use for DateTime columns (`relative` by default)
- `maxImageNum`: number of thumbnails to show for image columns (`1` by default)
- `editMode`: how to open edit links (string, `none` for same window, `blank` for new tab or `modal`)
- `viewMode`: how to open view links (same options as `editMode`)

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

## Reload after modal edits

When setting `editMode` to `modal`, the panel will reload its contents when the modal closes. Any changes made to the page will be visible immediately.
