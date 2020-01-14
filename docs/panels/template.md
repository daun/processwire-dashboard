
# Panel Type: Template

Display the output of any file in your template folder. The file will receive all API variables and any additional view variables you specify.

<img src="../images/template.png" width="400">

## Options

- `template`: template file name, relative to `/site/templates/` and including extension (string, required)
- `variables`: variables to pass into the template (array, empty by default)

## Example

```php
/* Panel config */
[
  'template' => 'dash.php',
  'variables' => [
    'text' => 'Lorem ipsum dolor ...',
  ],
]

/* Template file: site/templates/dash.php */

echo $text;
```
