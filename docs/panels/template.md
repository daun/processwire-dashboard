
# Panel Type: Template

Display the output of any file in your template folder. The file will receive all API variables and any additional view variables you specify.

![Template](../images/template.png ':size=400')

## Options

Required parameters are marked with an asterisk `*`

|Parameter|Type|Default|Description|
|---|---|---|---|
|**`template *`**|`string`||Template file name, relative to `/site/templates/` and including extension|
|`variables`|`array`|`[]`|Data to pass into the template|

## Example

### Panel configuration

```php
[
  'template' => 'dashboard/lorem.php',
  'variables' => [
    'text' => 'Lorem ipsum dolor ...',
  ],
]
```

### Template file

```php
/* site/templates/dashboard/lorem.php */

<p><?= $text ?></p>
```
